namespace Almondcove.Entities.Dedicated
{
    public class Message
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime DateAdded { get; set; }
        public string Origin { get; set; } = "na";
        public string Topic { get; set; } = "general";
    }
    

}
