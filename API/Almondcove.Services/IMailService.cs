using Almondcove.Entities.Shared;

namespace Almondcove.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(EmailMessage emailMessage);
    }
}
