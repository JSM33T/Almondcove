
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
    public class ArtifactRepository : IArtifactRepository
    {
        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        private readonly IDbConnection _dbConnection;
        protected readonly ILogger _logger;
        private string _conStr;

        public ArtifactRepository(IOptionsMonitor<AlmondcoveConfig> config, ILogger<ArtifactRepository> logger, IDbConnection dbConnection)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
            _dbConnection = dbConnection;
        }

        public async Task<PaginatedResult<Artifact_GetArtifacts>> GetPaginatedArtifactsAsync(Artifact_GetRequest request)
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);

            var parameters = new
            {
                request.PageNumber,
                request.PageSize,
                SearchString = string.IsNullOrEmpty(request.SearchString) ? null : request.SearchString,
                Type = string.IsNullOrEmpty(request.Type) ? null : request.Type,
                Category = string.IsNullOrEmpty(request.Category) ? null : request.Category,
                Tag = string.IsNullOrEmpty(request.Tag) ? null : request.Tag,
                Year = request.Year ?? null,
                FromDate = request.FromDate ?? null,
                ToDate = request.ToDate ?? null
            };

            var results = await dbConnection.QueryMultipleAsync("sproc_GetPaginatedArtifacts", parameters, commandType: CommandType.StoredProcedure);

            var artifacts = results.Read<Artifact_GetArtifacts>().ToList();
            var paginationInfo = results.ReadSingle<dynamic>();

            return new PaginatedResult<Artifact_GetArtifacts>
            {
                Items = artifacts,
                TotalRecords = (int)paginationInfo.TotalRecords,
                CurrentPage = (int)paginationInfo.CurrentPage,
                TotalPages = (int)paginationInfo.TotalPages
            };
        }


        public async Task<List<ArtifactCategory>> GetCategories()
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);
            var query = "SELECT Id, CategoryName, Slug, DateAdded FROM tblArtifactCategories";

            var categories = await dbConnection.QueryAsync<ArtifactCategory>(query);
            return categories.ToList();
        }

        public async Task<Artifact> GetArtifactDetailsBySlug(string Slug)
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);
            var query = $"SELECT * FROM tblArtifacts where Slug = '{Slug}'";

            Artifact artifact = await dbConnection.QuerySingleAsync<Artifact>(query, new { Slug = Slug });
            return artifact;
        }

    }
}
