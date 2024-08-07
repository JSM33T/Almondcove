namespace Almondcove.Entities.Shared
{
    public class DBResponse<T>(T data, DbOperationStatus status, string message = null)
    {
        public T Data { get; set; } = data;
        public DbOperationStatus Status { get; set; } = status;
        public string Message { get; set; } = message;
    }
    public enum DbOperationStatus
    {
        Success,
        Conflict,
        COnflictA,
        COnflictB,
        NotFound,
        ValidationFailed,
        Error
    }

}
