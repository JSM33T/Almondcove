using Almondcove.Entities.Dedicated;

namespace Almondcove.Entities.DTO
{
    public class Blog_GetDetails
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Content { get; set; }
        public IEnumerable<BlogAuthor> Authors { get; set; }
        public DateTime DateAdded { get; set; }

    }
}
