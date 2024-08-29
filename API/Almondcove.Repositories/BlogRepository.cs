
using Almondcove.Entities.Dedicated;
using Almondcove.Entities.DTO;
using Almondcove.Entities.Shared;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Data;

namespace Almondcove.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        private readonly IDbConnection _dbConnection;
        protected readonly ILogger _logger;
        private string _conStr;

        public BlogRepository(IOptionsMonitor<AlmondcoveConfig> config, ILogger<BlogRepository> logger, IDbConnection dbConnection)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
            _dbConnection = dbConnection;
        }

        public async Task<PaginatedResult<Blog_GetBlogs>> GetPaginatedBlogsAsync(Blog_GetRequest request)
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);

            var parameters = new
            {
                request.PageNumber,
                request.PageSize,
                SearchString = string.IsNullOrEmpty(request.SearchString) ? string.Empty : request.SearchString,
                Category = string.IsNullOrEmpty(request.Category) ? null : request.Category,
                Tag = string.IsNullOrEmpty(request.Tag) ? null : request.Tag,
                Year = request.Year ?? null,
                FromDate = request.FromDate ?? null,
                ToDate = request.ToDate ?? null
            };

            var results = await dbConnection.QueryMultipleAsync("sproc_GetPaginatedBlogs", parameters, commandType: CommandType.StoredProcedure);

            var Blogs = results.Read<Blog_GetBlogs>().ToList();
            var paginationInfo = results.ReadSingle<dynamic>();

            return new PaginatedResult<Blog_GetBlogs>
            {
                Items = Blogs,
                TotalRecords = (int)paginationInfo.TotalRecords,
                CurrentPage = (int)paginationInfo.CurrentPage,
                TotalPages = (int)paginationInfo.TotalPages
            };
        }


        public async Task<List<BlogCategory>> GetCategories()
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);
            var query = @" SELECT 
            c.Id, 
            c.CategoryName, 
            c.Slug, 
            c.DateAdded,
            (SELECT COUNT(*) FROM tblBlogs bm WHERE bm.CategoryId = c.Id) AS BlogCount
            FROM 
            tblBlogCategories c
";

            var categories = await dbConnection.QueryAsync<BlogCategory>(query);
            return categories.ToList();
        }

        public async Task<Blog> GetBlogDetailsBySlug(string Slug)
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);
            var query = $"SELECT * FROM tblBlogs WHERE Slug = '{Slug}'";

            Blog Blog = await dbConnection.QuerySingleOrDefaultAsync<Blog>(query, new { Slug = Slug });

            if (Blog != null)
            {
                Blog.Authors = await GetBlogAuthorsByBlogId(Blog.Id);
            }
            else
            {
                // Optionally handle the case where no data is found
                // For example, you can log a message or perform any other specific handling here
            }

            return Blog;
        }



        public async Task<IEnumerable<BlogAuthor>> GetBlogAuthorsByBlogId(int BlogId)
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);

            // Stored procedure call with Dapper
            var authors = await dbConnection.QueryAsync<BlogAuthor>(
                "sproc_GetBlogAuthorsByBlogId",
                new { BlogId = BlogId },
                commandType: CommandType.StoredProcedure
            );

            return authors;
        }


    }
}
