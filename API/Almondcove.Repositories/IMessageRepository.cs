using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;

namespace Almondcove.Repositories
{
    public interface IMessageRepository
    {
        Task<DBResponse<int>> AddMessageAsync(Message_Add messageRequest);
    }
}
