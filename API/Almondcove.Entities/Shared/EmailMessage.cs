namespace Almondcove.Entities.Shared
{
    public class EmailMessage
    {
        public List<string> Recipients { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }

}
