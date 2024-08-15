
using Almondcove.API.Middlewares;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Almondcove.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Data;
using System.Data.Common;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

#region Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .WriteTo.Async(a => a.File($"Logs/log.txt", rollingInterval: RollingInterval.Hour))
    .WriteTo.Console()
    .CreateLogger();

builder.Host.UseSerilog();
#endregion

#region Fluent Validatoins
builder.Services.AddFluentValidationAutoValidation()
                .AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssembly(Assembly.Load("Almondcove.Validators"));
#endregion

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "AlmondcoveAPI",
        Description = "Apis for almondcove.in"
    });
});

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);
}
else
{
    builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
}

var almondcoveConfigSection = builder.Configuration.GetSection("AlmondcoveConfig");
var almondcoveConfig = builder.Configuration.GetSection("AlmondcoveConfig").Get<AlmondcoveConfig>();

builder.Services.Configure<AlmondcoveConfig>(almondcoveConfigSection);

builder.Services.AddScoped<IDataService>(provider =>
{
    return new DataService(almondcoveConfig.ConnectionString.ToString());
});

//Register repositories
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IArtifactRepository, ArtifactRepository>();



//Register services
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<ITelegramService, TelegramService>();

builder.Services.AddScoped<IDbConnection>(sp => new SqlConnection(almondcoveConfig.ConnectionString));

#region Auth
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        RoleClaimType = ClaimTypes.Role,
        ValidIssuer = almondcoveConfig.JwtSettings.ValidIssuer,
        ValidAudience = almondcoveConfig.JwtSettings.ValidAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(almondcoveConfig.JwtSettings.IssuerSigningKey))
    };
});
#endregion


builder.Services.AddMemoryCache();

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});


builder.Services.AddHttpClient();

builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(Path.Combine(builder.Environment.WebRootPath, "keys")))
    .SetApplicationName("AlmondcoveApp");

var rateLimitingOptions = new RateLimitingConfig();
builder.Configuration.GetSection("RateLimiting").Bind(rateLimitingOptions);


#region rateLimiter

var rateLimitSettings = builder.Configuration.GetSection("RateLimiting").Get<RateLimitingConfig>();

// Register the global rate limiter
builder.Services.AddRateLimiter(options =>
{
    if (rateLimitSettings?.Global != null)
    {
        options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
            RateLimitPartition.GetFixedWindowLimiter("GlobalLimiter", _ =>
                new FixedWindowRateLimiterOptions
                {
                    PermitLimit = rateLimitSettings.Global.PermitLimit,
                    Window = rateLimitSettings.Global.Window,
                    QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                    QueueLimit = rateLimitSettings.Global.QueueLimit
                }));
    }

    // Register route-specific limiters
    if (rateLimitSettings?.Routes != null)
    {
        foreach (var route in rateLimitSettings.Routes)
        {
            options.AddPolicy(route.Key, partition =>
                RateLimitPartition.GetFixedWindowLimiter(partition, _ =>
                    new FixedWindowRateLimiterOptions
                    {
                        PermitLimit = route.Value.PermitLimit,
                        Window = route.Value.Window,
                        QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                        QueueLimit = route.Value.QueueLimit
                    }));
        }
    }
});
#endregion

builder.Services.AddCors(o => o.AddPolicy("OpenPolicy", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}
else
{

}

app.UseCors("OpenPolicy");
app.UseHttpsRedirection();
app.UseMiddleware<AcValidationMiddleware>();
app.UseStaticFiles();
app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();