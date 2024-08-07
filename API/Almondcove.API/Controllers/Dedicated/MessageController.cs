using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.API.Controllers.Dedicated
{
    [Route("api/message")]
    [ApiController]
    public class MessageController : FoundationController
    {
        private readonly IMessageRepository _messageRepo;

        public MessageController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, IMessageRepository messageRepository)
            : base(config, logger, httpContextAccessor)
        {
            _messageRepo = messageRepository;
        }

        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] Message_Add request)
        {
            return await ExecuteActionAsync(async () =>
            {
                #region Logic
                // Add your logic here
                var response = await _messageRepo.AddMessageAsync(request);
                int statusCode;
                string message = response.Message;
                List<string> errors = new List<string>();

                switch (response.Status)
                {
                    case DbOperationStatus.Success:
                        statusCode = StatusCodes.Status200OK;
                        break;
                    case DbOperationStatus.Conflict:
                        statusCode = StatusCodes.Status409Conflict;
                        errors.Add(response.Message);
                        break;
                    case DbOperationStatus.ValidationFailed:
                        statusCode = StatusCodes.Status400BadRequest;
                        errors.Add(response.Message);
                        break;
                    case DbOperationStatus.NotFound:
                        statusCode = StatusCodes.Status404NotFound;
                        errors.Add(response.Message);
                        break;
                    default:
                        statusCode = StatusCodes.Status500InternalServerError;
                        errors.Add("An unexpected error occurred.");
                        break;
                }

                return (statusCode, response.Data, message, errors);

                #endregion

            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
