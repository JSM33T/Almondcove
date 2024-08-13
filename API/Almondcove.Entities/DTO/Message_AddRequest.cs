using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.DTO
{
    public class Message_AddRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Content { get; set; }
        public string Origin { get; set; }
        public string Topic { get; set; }
    }
}
