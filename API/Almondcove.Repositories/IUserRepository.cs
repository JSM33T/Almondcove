using Almondcove.Entities.DTO;
using Almondcove.Entities.Enums;

namespace Almondcove.Repositories
{
    public interface IUserRepository
    {
        public Task<User_ClaimsResponse> UserLogin(User_LoginRequest request);
        public Task<(DbResult, User_ClaimsResponse)> UserSignup(User_SignupRequest request);
    }
}
