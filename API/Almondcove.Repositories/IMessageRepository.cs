using Almondcove.Entities.DTO;
using Almondcove.Entities.Enums;

namespace Almondcove.Repositories
{
    public interface IMessageRepository
    {
        public Task<DbResult> CheckAndAddMessage(Message_AddRequest messageRequest);
    }

}
