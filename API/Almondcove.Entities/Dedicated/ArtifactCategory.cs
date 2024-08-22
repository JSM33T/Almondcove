namespace Almondcove.Entities.Dedicated
{
    public class BlogCategory
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string Slug { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public int BlogCount { get; set; } = 0;
    }
}
