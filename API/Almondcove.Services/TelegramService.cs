//using Almondcove.Entities.Shared;
//using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Options;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http;
//using System.Text;
//using System.Threading.Tasks;

//namespace Almondcove.Services
//{
//    public class TelegramService : ITelegramService
//    {
//        private readonly HttpClient _httpClient;
//        private readonly IOptionsMonitor<AlmondcoveConfig> _config;
//        private readonly TelegramBotSettings _telebot;
//        private readonly ILogger<TelegramService> _logger;
//        public TelegramService(IHttpClientFactory httpClientFactory, IOptionsMonitor<AlmondcoveConfig> config, ILogger<TelegramService> logger)
//        {
//            _config = config;
//            _telebot = _config.CurrentValue.TelegramBot;
//            _logger = logger;
//            _httpClient = httpClientFactory.CreateClient();
//        }

//        public async Task SendMessageAsync(string message)
//        {
//            var url = $"https://api.telegram.org/bot{_telebot.BotToken}/sendMessage?chat_id={_telebot.LogChatId}&text={message}";
//            var response = await _httpClient.GetAsync(url);

//            if (!response.IsSuccessStatusCode)
//            {
//                _logger.LogError("erro sending telegram message {response}",response);
//                throw new Exception("Failed to send message via Telegram");
//            }
//        }
//    }
//}
using Almondcove.Entities.Shared;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
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
                await _botClient.SendTextMessageAsync(
                    chatId: _telebot.LogChatId,
                    text: message,
                    parseMode: ParseMode.Html
                );
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
