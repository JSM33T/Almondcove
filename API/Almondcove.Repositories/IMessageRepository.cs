using Almondcove.Entities.Dedicated;
using Almondcove.Entities.DTO;
using Almondcove.Entities.Enums;
using Almondcove.Entities.Shared;

namespace Almondcove.Repositories
{
    public interface IMessageRepository
    {
        public Task<DbResult> CheckAndAddMessage(Message_AddRequest messageRequest);
    }

}
