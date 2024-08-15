
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
            using (IDbConnection dbConnection = new SqlConnection(_conStr))
            {
                var parameters = new
                {
                    request.PageNumber,
                    request.PageSize,
                    request.SearchString,
                    request.Type,
                    request.FromDate,
                    request.ToDate
                };

                var results = await dbConnection.QueryMultipleAsync("sproc_GetPaginatedArtifacts", parameters, commandType: CommandType.StoredProcedure);

                var artifacts = results.Read<Artifact_GetArtifacts>();
                var paginationInfo = results.ReadSingle<dynamic>();

                return new PaginatedResult<Artifact_GetArtifacts>
                {
                    Items = artifacts,
                    TotalRecords = (int)paginationInfo.TotalRecords,
                    CurrentPage = (int)paginationInfo.CurrentPage,
                    TotalPages = (int)paginationInfo.TotalPages
                };
            }
        }
    }
}
