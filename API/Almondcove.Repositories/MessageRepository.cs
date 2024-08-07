using Almondcove.Entities;
using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Microsoft.EntityFrameworkCore;

namespace Almondcove.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly AcDbContext _context;

        public MessageRepository(AcDbContext context)
        {
            _context = context;
        }

        public async Task<DBResponse<int>> AddMessageAsync(Message_Add messageRequest)
        {
            
            var existingMessage = await _context.Messages
                .FirstOrDefaultAsync(m => m.MessageText == messageRequest.MessageText);

            if (existingMessage != null)
            {
                return new DBResponse<int>(existingMessage.Id, DbOperationStatus.Conflict, "Message already exists.");
            }

            // Check for some other condition (example condition)
            //if ()
            //{
            //    return new DBResponse<int>(0, DbOperationStatus.ValidationFailed, "Some validation condition failed.");
            //}

            var newMessage = new Message
            {
                MessageText = messageRequest.MessageText,
                DateAdded = DateTime.UtcNow
            };

            _context.Messages.Add(newMessage);
            await _context.SaveChangesAsync();

            return new DBResponse<int>(newMessage.Id, DbOperationStatus.Success, "Message added successfully.");
        }
    }
}
