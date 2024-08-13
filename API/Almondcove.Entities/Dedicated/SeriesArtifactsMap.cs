namespace Almondcove.Entities.Dedicated
{
    public class SeriesArtifactsMap
    {
        public int Id { get; set; }
        public int SeriesId { get; set; }
        public int ArtifactId { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
    }
}
