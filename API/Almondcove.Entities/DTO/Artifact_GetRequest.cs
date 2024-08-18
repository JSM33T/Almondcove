namespace Almondcove.Entities.DTO
{
    public class Blog_GetRequest
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        public string SearchString { get; set; } = null;
        public string Type { get; set; } = null;
        public string Category { get; set; } = null;
        public string Tag { get; set; } = null;

        public int? Year { get; set; } = null;
        public string FromDate { get; set; } = string.Empty;
        public string ToDate { get; set; } = string.Empty;
    }
}
