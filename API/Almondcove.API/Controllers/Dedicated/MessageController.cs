using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Almondcove.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace Almondcove.API.Controllers.Dedicated
{
    [Route("api/message")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class MessageController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor,ITelegramService telegramService, IMessageRepository messageRepository) : FoundationController(config, logger, httpContextAccessor,telegramService)
    {
        private readonly IMessageRepository _messageRepo = messageRepository;

        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] MessageRequest messageRequest)
        {
            int statusCode = 200;
            string message = "Message Sent";
            List<string> hints = [];

            return await ExecuteActionAsync(async () =>
            {
                var existingMessage = await _messageRepo.GetMessageByContentAsync(messageRequest.Content);
                if (existingMessage != null)
                {
                    statusCode = StatusCodes.Status409Conflict;
                    message = "A message with the same content already exists.";
                    hints.Add("Please use a different content for the message.");
                    return (statusCode, 0, message, hints);
                }

                await _messageRepo.CreateMessageAsync(messageRequest);


                return (statusCode, 0, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            int statusCode = 200;
            string message = "Success";
            List<string> hints = [];

            return await ExecuteActionAsync(async () =>
            {
                var messages = await _messageRepo.GetAllMessagesAsync();

                return (statusCode, messages, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
