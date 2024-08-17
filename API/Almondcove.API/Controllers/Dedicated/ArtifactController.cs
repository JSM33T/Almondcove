using Almondcove.Entities.Dedicated;
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
    public class ArtifactController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, ITelegramService telegramService, IArtifactRepository artifactRepository) : FoundationController(config, logger, httpContextAccessor, telegramService)
    {
        private readonly IArtifactRepository _artifactRepo = artifactRepository;

        [HttpPost("search")]
        public async Task<IActionResult> GetArtifactsByPagination([FromBody] Artifact_GetRequest request)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = 200;
                string message = "Artifacts retrieved";
                List<string> hints = [];
                PaginatedResult<Artifact_GetArtifacts> result = null;


                result = await _artifactRepo.GetPaginatedArtifactsAsync(request);

                if (result.TotalRecords <= 0)
                {
                    statusCode = StatusCodes.Status404NotFound;
                    message = "Not found";
                    hints.Add("no artifacts match this criteria");
                }

                return (statusCode, result, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }

        [HttpGet("load/{year}/{slug}")]
        public async Task<IActionResult> GetStuff(string slug, string year)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = StatusCodes.Status404NotFound;
                string message = "No artifact found";
                List<string> hints = [];
                Artifact_GetDetails artifactDetails = new();
                Artifact artifact = new();

                var filePath = Path.Combine("wwwroot", "content", year, slug, $"content.md");
                artifact = await _artifactRepo.GetArtifactDetailsBySlug(slug);

                artifactDetails.Slug = artifact.Slug;
                artifactDetails.Name = artifact.ArtifactName;
                artifactDetails.DateAdded = artifact.DateAdded;
                artifactDetails.Id = artifact.Id;

                if (System.IO.File.Exists(filePath))
                {
                    artifactDetails.Content = await System.IO.File.ReadAllTextAsync(filePath);
                    statusCode = StatusCodes.Status200OK;
                    artifactDetails.Authors = await _artifactRepo.GetArtifactAuthorsByArtifactId(artifactDetails.Id);
                    message = "Retrieved";
                }

                return (statusCode, artifactDetails, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }


        [HttpGet("details/{slug}")]
        public async Task<IActionResult> GetCategoryStuff(string slug)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = StatusCodes.Status404NotFound;
                string message = "No artifact found";
                List<string> hints = [];
                Artifact artifact = new();

                artifact = await _artifactRepo.GetArtifactDetailsBySlug(slug);
                if (artifact  != null)
                {
                    message = "retrieved";
                    statusCode = StatusCodes.Status200OK;
                }

                return (statusCode, artifact, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }


        [HttpGet("getcategories")]
        public async Task<IActionResult> GetCategoryStuff()
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = StatusCodes.Status404NotFound;
                string message = "No artifact found";
                List<string> hints = [];
                List<ArtifactCategory> categories = [];

                categories = await _artifactRepo.GetCategories();
                if (categories.Count > 0)
                {
                    message = "retrieved";
                    statusCode = StatusCodes.Status200OK;
                }

                return (statusCode, categories, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
