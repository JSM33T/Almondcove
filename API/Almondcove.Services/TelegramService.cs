using Almondcove.Entities.Shared;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Telegram.Bot;
using Telegram.Bot.Types.Enums;

namespace Almondcove.Services
{
    public class TelegramService : ITelegramService
    {
        private readonly TelegramBotClient _botClient;
        private readonly TelegramBotSettings _telebot;
        private readonly ILogger<TelegramService> _logger;

        public TelegramService(IOptionsMonitor<AlmondcoveConfig> config, ILogger<TelegramService> logger)
        {
            _telebot = config.CurrentValue.TelegramBot;
            _logger = logger;
            _botClient = new TelegramBotClient(_telebot.BotToken);
        }

        public async Task SendMessageAsync(string message)
        {
            try
            {
                //await _botClient.SendTextMessageAsync(
                //    chatId: _telebot.LogChatId,
                //    text: message,
                //    parseMode: ParseMode.Html
                //);
                //await _botClient.SendTextMessageAsync(_telebot.LogChatId, message);
                _logger.LogInformation("Message sent successfully to Telegram.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending telegram message");
                throw new Exception("Failed to send message via Telegram", ex);
            }
        }
    }
}
