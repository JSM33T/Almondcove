using Almondcove.Entities.Shared;
using Almondcove.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace Almondcove.API.Controllers
{
    [Route("/")]
    [ApiController]
    public class CoreController(IWebHostEnvironment hostingEnvironment, INotificationService notificationService, IMailService mailService, ITelegramService telegramService) : ControllerBase
    {

        private readonly IWebHostEnvironment _hostingEnvironment = hostingEnvironment;
        private readonly INotificationService _notificationService = notificationService;
        private readonly IMailService _mailService = mailService;
        private readonly ITelegramService _telegramService = telegramService;

        [Authorize(Roles = "admin")]
        [HttpPost("restart")]
        public IActionResult Restart()
        {
            string appPath = _hostingEnvironment.ContentRootPath;

            ProcessStartInfo info = new()
            {
                FileName = System.Reflection.Assembly.GetEntryAssembly().Location,
                Arguments = string.Join(" ", Environment.GetCommandLineArgs().Skip(1))
            };

            Process.Start(info);

            Environment.Exit(0);

            return Ok("Restarting the application");
        }

        [HttpGet]
        public async Task<IActionResult> HeartBeat()
        {
            return Ok("hello form the server");
        }

        [HttpPost("sendEmail")]
        [Authorize(Roles ="admin")]
        public async Task<IActionResult> SendEmail([FromBody] EmailMessage emailMessage)
        {
            await _mailService.SendEmailAsync(emailMessage);

            return Ok("Email has been sent");
        }

        [HttpGet("tele")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> testtele()
        {
            await _telegramService.SendMessageAsync("Hello from the server");

            return Ok("Hello from the server");
        }

    }
}
