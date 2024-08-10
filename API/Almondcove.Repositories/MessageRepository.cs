using Almondcove.Entities;
using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Data;

namespace Almondcove.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        protected readonly ILogger _logger;
        private string _conStr;

        public MessageRepository(IOptionsMonitor<AlmondcoveConfig> config, ILogger<MessageRepository> logger)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
        }


        public async Task CreateMessageAsync(MessageRequest messageRequest)
        {
            using IDbConnection db = new SqlConnection(_conStr);

            var parameters = new
            {
                messageRequest.Content,
                messageRequest.Origin,
                messageRequest.Topic,
                messageRequest.Name,
                messageRequest.Email
            };

            var result = await db.QueryFirstOrDefaultAsync<int>("sprocInsertMessage", messageRequest, commandType: CommandType.StoredProcedure);
        }

        public async Task<Message> GetMessageByContentAsync(string content)
        {
            using IDbConnection db = new SqlConnection(_conStr);

            var parameters = new
            {
                Content = content
            };

            return await db.QueryFirstOrDefaultAsync<Message>("sprocGetMessageByContent", parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<IEnumerable<Message>> GetAllMessagesAsync()
        {
            using IDbConnection db = new SqlConnection(_conStr);

            string query = "SELECT * FROM Messages;";
            return await db.QueryAsync<Message>(query);
        }

        public async Task<Message> GetMessageByIdAsync(int id)
        {
            using IDbConnection db = new SqlConnection(_conStr);

            string query = "SELECT * FROM Messages WHERE Id = @Id;";
            return await db.QueryFirstOrDefaultAsync<Message>(query, new { Id = id });
        }
    }



}
