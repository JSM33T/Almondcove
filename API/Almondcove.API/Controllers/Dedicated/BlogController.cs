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
    [Route("api/blog")]
    [ApiController]
    public class BlogController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, ITelegramService telegramService, IBlogRepository BlogRepository) : FoundationController(config, logger, httpContextAccessor, telegramService)
    {
        private readonly IBlogRepository _BlogRepo = BlogRepository;

        [HttpPost("search")]
        public async Task<IActionResult> GetBlogsByPagination([FromBody] Blog_GetRequest request)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = 200;
                string message = "Blogs retrieved";
                List<string> hints = [];
                PaginatedResult<Blog_GetBlogs> result = null;


                result = await _BlogRepo.GetPaginatedBlogsAsync(request);

                if (result.TotalRecords <= 0)
                {
                    statusCode = StatusCodes.Status404NotFound;
                    message = "Not found";
                    hints.Add("no Blogs match this criteria");
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
                string message = "No Blog found";
                List<string> hints = [];
                Blog_GetDetails BlogDetails = new();
                Blog Blog = new();

                var filePath = Path.Combine("wwwroot", "content", year, slug, $"content.md");
                Blog = await _BlogRepo.GetBlogDetailsBySlug(slug);
                if (Blog != null)
                {
                    BlogDetails.Slug = Blog.Slug;
                    BlogDetails.Name = Blog.BlogName;
                    BlogDetails.DateAdded = Blog.DateAdded;
                    BlogDetails.Id = Blog.Id;

                    if (System.IO.File.Exists(filePath))
                    {
                        BlogDetails.Content = await System.IO.File.ReadAllTextAsync(filePath);
                        statusCode = StatusCodes.Status200OK;
                        BlogDetails.Authors = await _BlogRepo.GetBlogAuthorsByBlogId(BlogDetails.Id);
                        message = "Retrieved";
                    }
                }
                else
                {
                    message = "not found";
                    statusCode = StatusCodes.Status404NotFound;
                    hints.Add("NO blog found with this criteria");
                    BlogDetails = null;
                    
                }
               

                return (statusCode, BlogDetails, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }


        [HttpGet("details/{slug}")]
        public async Task<IActionResult> GetCategoryStuff(string slug)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = StatusCodes.Status404NotFound;
                string message = "No Blog found";
                List<string> hints = [];
                Blog Blog = new();

                Blog = await _BlogRepo.GetBlogDetailsBySlug(slug);
                if (Blog  != null)
                {
                    message = "retrieved";
                    statusCode = StatusCodes.Status200OK;
                }
                else
                {
                    hints.Add("No blog found with this criteria");
                }

                return (statusCode, Blog, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }


        [HttpGet("getcategories")]
        public async Task<IActionResult> GetCategoryStuff()
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = StatusCodes.Status404NotFound;
                string message = "No Blog found";
                List<string> hints = [];
                List<BlogCategory> categories = [];

                categories = await _BlogRepo.GetCategories();
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
