using Almondcove.Entities;
using Almondcove.Entities.Dedicated;
using Microsoft.EntityFrameworkCore;

namespace Almondcove.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly AppDbContext _context;

        public MessageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateMessageAsync(MessageRequest messageRequest)
        {
            var message = new Message
            {
                Content = messageRequest.Content,
                DateAdded = DateTime.UtcNow,
                Origin = messageRequest.Origin,
                Topic = messageRequest.Topic
            };
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
        }

        public async Task<Message> GetMessageByContentAsync(string content)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Content == content);
        }


        public async Task<IEnumerable<Message>> GetAllMessagesAsync()
        {
            return await _context.Messages.ToListAsync();
        }

        public async Task<Message> GetMessageByIdAsync(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task UpdateMessageAsync(Message message)
        {
            _context.Entry(message).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteMessageAsync(Message message)
        {
            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();
        }
    }


}
