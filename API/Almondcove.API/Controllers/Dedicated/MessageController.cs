using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Almondcove.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.API.Controllers.Dedicated
{
    [Route("api/messages")]
    [ApiController]
    public class MessageController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor,ITelegramService telegramService, IMessageRepository messageRepository) : FoundationController(config, logger, httpContextAccessor,telegramService)
    {
        private readonly IMessageRepository _messageRepo = messageRepository;

        [HttpPost("send")]
        [EnableRateLimiting("api/messages/send")]
        [AllowAnonymous]
        public async Task<IActionResult> SendMessage([FromBody] MessageRequest messageRequest)
        {
            int statusCode = 200;
            string message = "TOAST.OK";
            List<string> hints = [];

            return await ExecuteActionAsync(async () =>
            {
                var existingMessage = await _messageRepo.GetMessageByContentAsync(messageRequest.Content);
                if (existingMessage != null)
                {
                    statusCode = StatusCodes.Status409Conflict;
                    message = "Conflict";
                    hints.Add("This message already exists");
                    return (statusCode, 0, message, hints);
                }

                await _messageRepo.CreateMessageAsync(messageRequest);


                return (statusCode, 0, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }


        [Authorize(Roles = "admin")]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            int statusCode = 200;
            string message = "TOAST.OK";
            List<string> hints = [];

            return await ExecuteActionAsync(async () =>
            {
                var messages = await _messageRepo.GetAllMessagesAsync();

                return (statusCode, messages, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
