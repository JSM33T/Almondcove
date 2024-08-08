using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace Almondcove.Services
{
    public class DataService : IDataService
    {
        private readonly string _connectionString;

        public DataService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<T>> GetAllAsync<T>(string query)
        {
            using IDbConnection db = new SqlConnection(_connectionString);
            return await db.QueryAsync<T>(query);
        }

        public async Task ExecuteAsync(string query)
        {
            using IDbConnection db = new SqlConnection(_connectionString);
            await db.ExecuteAsync(query);
        }
    }
}
