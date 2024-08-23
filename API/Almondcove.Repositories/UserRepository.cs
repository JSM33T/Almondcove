﻿using Almondcove.Entities.DTO;
using Almondcove.Entities.Shared;
using Dapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Data;

namespace Almondcove.Repositories
{
    public class UserRepository : IUserRepository
    {
        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        private readonly IDbConnection _dbConnection;
        protected readonly ILogger _logger;
        private readonly string _conStr;

        public UserRepository(IOptionsMonitor<AlmondcoveConfig> config, ILogger<MessageRepository> logger, IDbConnection dbConnection)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
            _dbConnection = dbConnection;
        }

        public async Task<User_ClaimsResponse> UserLogin(User_LoginRequest request)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@Username", request.Username, DbType.String, ParameterDirection.Input);
            parameters.Add("@Password", request.Password , DbType.String, ParameterDirection.Input);

            using var results = await _dbConnection.QueryMultipleAsync("sproc_UserLogin", parameters, commandType: CommandType.StoredProcedure);

            var user = results.Read<User_ClaimsResponse>().SingleOrDefault() ?? null;

            return user;
        }

        public async Task<User_ClaimsResponse> UserSignup(User_SignupRequest request)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@Firstname", request.Firstname, DbType.String, ParameterDirection.Input);
            parameters.Add("@Lastname", request.Lastname, DbType.String, ParameterDirection.Input);
            parameters.Add("@Username", request.Username, DbType.String, ParameterDirection.Input);
            parameters.Add("@Email", request.Email, DbType.String, ParameterDirection.Input);
            parameters.Add("@Password", request.Password, DbType.String, ParameterDirection.Input); // Hash the password before storing
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _dbConnection.ExecuteAsync("sproc_UserSignup", parameters, commandType: CommandType.StoredProcedure);

            int result = parameters.Get<int>("@Result");

            return null;
        }

    }
}