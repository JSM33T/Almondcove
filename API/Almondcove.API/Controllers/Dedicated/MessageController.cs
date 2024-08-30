using Almondcove.Entities.DTO;
using Almondcove.Entities.Enums;
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
    public class MessageController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, ITelegramService telegramService, IMessageRepository messageRepository) : FoundationController(config, logger, httpContextAccessor, telegramService)
    {
        private readonly IMessageRepository _messageRepo = messageRepository;

        [HttpPost("send")]
        [EnableRateLimiting("api/messages/send")]
        [AllowAnonymous]
        #region Send message
        public async Task<IActionResult> SendMessage([FromBody] Message_AddRequest messageRequest)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = default;
                string message = string.Empty;
                List<string> hints = [];

                DbResult result = await _messageRepo.CheckAndAddMessage(messageRequest);

                await telegramService.SendMessageAsync($"new message received from {messageRequest.Name}: \n {messageRequest.Content} on route {messageRequest.Origin}");

                switch (result)
                {
                    case DbResult.Conflict:
                        statusCode = StatusCodes.Status409Conflict;
                        message = "Conflict";
                        hints.Add("Message is already in the database");
                        break;

                    case DbResult.Success:
                        statusCode = StatusCodes.Status200OK;
                        message = "Success";
                        hints.Add("Message has been submitted");
                        break;
                }


                return (statusCode, 0, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion
    }
}
