using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.Dedicated
{
    public class Blog
    {
        public int Id { get; set; }
        public string BlogName { get; set; }
        public string Description { get; set; }
        public string Slug { get; set; }
        public int CategoryId { get; set; }
        public IEnumerable<BlogAuthor> Authors { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
    } 
}
