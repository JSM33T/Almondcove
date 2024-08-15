using Almondcove.Entities.DTO;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Almondcove.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.API.Controllers.Dedicated
{
    [Route("api/artifact")]
    [ApiController]
    public class ArtifactController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, ITelegramService telegramService,IArtifactRepository artifactRepository) : FoundationController(config, logger, httpContextAccessor, telegramService)
    {
        private readonly IArtifactRepository _artifactRepo = artifactRepository;

        [HttpPost("search")]
        public async Task<IActionResult> GetArtifactsByPagination([FromBody] Artifact_GetRequest request)
        {
            int statusCode = 200;
            string message = "Artifacts retrieved";
            List<string> hints = [];

            return await ExecuteActionAsync(async () =>
            {
                var result = await _artifactRepo.GetPaginatedArtifactsAsync(request);

                return (statusCode, result, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }

        [HttpGet("load/{year}/{slug}")]
        public async Task<IActionResult> GetStuff(string slug,string year)
        {
            int statusCode = StatusCodes.Status404NotFound;
            string message = "No artifact found";
            List<string> hints = [];

            return await ExecuteActionAsync(async () =>
            {

                var filePath = Path.Combine("wwwroot","content",year,slug, $"content.md");
                string markdownContent = string.Empty;

                if (System.IO.File.Exists(filePath))
                {
                    markdownContent = await System.IO.File.ReadAllTextAsync(filePath);
                    statusCode = StatusCodes.Status200OK;
                    message = "Retrieved";
                }

               
                return (statusCode, markdownContent, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
