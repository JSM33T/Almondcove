using Almondcove.Entities.DTO;
using Almondcove.Entities.Enums;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Almondcove.Services;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Text;

namespace Almondcove.API.Controllers.Dedicated
{
    [Route("api/account")]
    [ApiController]
    public class AccountController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, ITelegramService telegramService, IUserRepository userRepository) : FoundationController(config, logger, httpContextAccessor, telegramService)
    {
        private readonly IUserRepository _userRepo = userRepository;

        #region LOGIN CONTROLLER
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] User_LoginRequest request)
        {
            return await ExecuteActionAsync(async () =>
            {

                int statCode = default;
                string message = string.Empty;
                List<string> errors = [];
                User_ClaimsResponse userClaims;

                userClaims = await _userRepo.UserLogin(request);

                if (userClaims != null)
                {
                    statCode = StatusCodes.Status200OK;
                    var claims = new[]
                       {
                            new Claim(ClaimTypes.Email, userClaims.Email),
                            new Claim(ClaimTypes.Role, userClaims.Role),
                            new Claim("UserName", userClaims.FirstName),
                            new Claim("Role", userClaims.Role),
                            new Claim("FirstName", userClaims.FirstName),
                            new Claim("LastName", userClaims.LastName),
                            new Claim("Avatar", userClaims.Avatar),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                        };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.CurrentValue.JwtSettings.IssuerSigningKey));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: _config.CurrentValue.JwtSettings.ValidIssuer,
                        audience: _config.CurrentValue.JwtSettings.ValidAudience,
                        claims: claims,
                        expires: DateTime.Now.AddDays(7),
                        signingCredentials: creds);

                    userClaims.Token = new JwtSecurityTokenHandler().WriteToken(token);
                }


                return (statCode, userClaims, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion

        #region SIGNUP CONTROLLER
        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<IActionResult> Signup([FromBody] User_SignupRequest request)
        {
            return await ExecuteActionAsync(async () =>
            {

                int statCode = default;
                string message = string.Empty;
                List<string> errors = [];
                User_ClaimsResponse userClaims;
                DbResult result;

                (result, userClaims) = await _userRepo.UserSignup(request);

                if (result == DbResult.Conflict)
                {
                    message = "Username occupied";
                    statCode = StatusCodes.Status409Conflict;
                    errors.Add("Username not available");
                }
                else
                {
                    message = "Signed up";
                    statCode = StatusCodes.Status200OK;
                    errors.Add("");
                }

                return (statCode, userClaims, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion
    }
}
