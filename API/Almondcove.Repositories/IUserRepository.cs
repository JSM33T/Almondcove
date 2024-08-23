using Almondcove.Entities.DTO;

namespace Almondcove.Repositories
{
    public interface IUserRepository
    {
        public Task<User_ClaimsResponse> UserLogin(User_LoginRequest request);
        public Task<User_ClaimsResponse> UserSignup(User_SignupRequest request);
    }
}
