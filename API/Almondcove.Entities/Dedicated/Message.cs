namespace Almondcove.Entities.Dedicated
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime DateAdded { get; set; }
        public string Origin { get; set; } = "na";
        public string Topic { get; set; } = "na";
    }
    public class MessageRequest
    {
        public string Content { get; set; }
        public string Origin { get; set; }
        public string Topic { get; set; }
    }

}
