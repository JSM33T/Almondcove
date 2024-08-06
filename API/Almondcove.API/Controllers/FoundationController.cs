using Almondcove.Entities.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Diagnostics;

namespace Almondcove.API.Controllers
{
    [ApiController]
    public abstract class FoundationController : ControllerBase
    {
        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        protected readonly ILogger _logger;
        protected readonly IHttpContextAccessor _httpContextAccessor;

        public FoundationController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor)
        {
            _config = config;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
        }

        protected async Task<IActionResult> ExecuteActionAsync<T>(Func<Task<(int statusCode, T result, string message, List<string> errors)>> action, string methodName)
        {
            var stopwatch = Stopwatch.StartNew();
            var request = _httpContextAccessor.HttpContext.Request;
            var user = _httpContextAccessor.HttpContext.User.Identity.IsAuthenticated
                        ? _httpContextAccessor.HttpContext.User.Identity.Name
                        : "Anonymous";

            try
            {
                var (statusCode, result, message, errors) = await action();
                return AcResponse(statusCode, message, result, errors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in {MethodName}. User: {User}. URL: {Url}. Query: {Query} UserAgent: {UserAgent}", methodName, user, request.Path, request.QueryString, request.Headers.UserAgent);
                return AcResponse(500, "An error occurred while processing your request.", default(T), new List<string> { "Something went wrong", "Error has been logged" });
            }
            finally
            {
                stopwatch.Stop();
                _logger.LogInformation("{MethodName} executed in {Duration} ms. User: {User}. URL: {Url}. Query: {Query} UserAgent: {UserAgent}", methodName, stopwatch.ElapsedMilliseconds, user, request.Path, request.QueryString, request.Headers.UserAgent);
            }
        }

        protected IActionResult AcResponse<T>(int status, string message, T data, List<string> errors = null)
        {
            var response = new APIResponse<T>(status, message, data, errors);
            return StatusCode(status, response);
        }
    }
}
