using Almondcove.Entities.DTO;
using Almondcove.Entities.Shared;

namespace Almondcove.Repositories
{
    public interface IArtifactRepository
    {
        public Task<PaginatedResult<Artifact_GetArtifacts>> GetPaginatedArtifactsAsync(Artifact_GetRequest request);
    }
}
