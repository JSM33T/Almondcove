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
        private readonly IMessageRepository _mailRepo;

        public MessageController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, IMessageRepository messageRepository)
            : base(config, logger, httpContextAccessor)
        {
            _mailRepo = messageRepository;
        }

        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] Message_Add request)
        {
            return await ExecuteActionAsync(async () =>
            {
                #region Logic

                int statCode = StatusCodes.Status400BadRequest;
                string message = "Request is invalid.";
                List<string> hints = [];

                // Add your logic here and set statCode, message, errors, and result accordingly

                return (statCode, 0, message, hints);

                #endregion

            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
