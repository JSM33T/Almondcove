using Almondcove.Entities.Dedicated;
using Almondcove.Entities.DTO;
using Almondcove.Entities.Shared;

namespace Almondcove.Repositories
{
    public interface IArtifactRepository
    {
        public Task<PaginatedResult<Artifact_GetArtifacts>> GetPaginatedArtifactsAsync(Artifact_GetRequest request);
        public Task<List<ArtifactCategory>> GetCategories();
        public Task<Artifact> GetArtifactDetailsBySlug(string Slug);
        public Task<IEnumerable<ArtifactAuthor>> GetArtifactAuthorsByArtifactId(int artifactId);
    }
}
