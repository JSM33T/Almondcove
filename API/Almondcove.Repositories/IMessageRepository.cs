using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;

namespace Almondcove.Repositories
{
    public interface IMessageRepository
    {
        Task CreateMessageAsync(MessageRequest messageRequest);
        Task<IEnumerable<Message>> GetAllMessagesAsync();
        Task<Message> GetMessageByContentAsync(string content); // Add this method
        Task<Message> GetMessageByIdAsync(int id);
    }

}
