using Microsoft.Extensions.Logging;

namespace Almondcove.Services
{
    public class NotificationService : INotificationService
    {
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(ILogger<NotificationService> logger)
        {
            _logger = logger;
        }
        public async Task SendNotificationAsync(string message)
        {
            try {
                _logger.LogInformation("Attempting notification: {Message}", message);
                await Task.Delay(10000);
                _logger.LogInformation("Notification sent: {Message}", message);
            }
            catch(Exception ex) {
                _logger.LogError("exception sending notification: {ex}", ex);
            }
            
        }
    }
}
