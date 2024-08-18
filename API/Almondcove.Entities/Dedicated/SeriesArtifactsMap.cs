namespace Almondcove.Entities.Dedicated
{
    public class SeriesBlogsMap
    {
        public int Id { get; set; }
        public int SeriesId { get; set; }
        public int BlogId { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
    }
}
