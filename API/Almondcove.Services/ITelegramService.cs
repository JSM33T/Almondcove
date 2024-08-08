using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Services
{
    public interface ITelegramService
    {
        public Task SendMessageAsync(string message);
    }
}
