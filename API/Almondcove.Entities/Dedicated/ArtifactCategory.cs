using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.Dedicated
{
    public class BlogCategory
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string Slug { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
    }
}
