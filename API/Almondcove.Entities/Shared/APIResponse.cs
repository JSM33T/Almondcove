using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.Shared
{
    public class APIResponse<T>(int status, string message, T data, List<string> errors = null)
    {
        public int Status { get; set; } = status;
        public string Message { get; set; } = message;
        public List<string> Errors { get; set; } = errors ?? [];
        public T Data { get; set; } = data;
    }
}
