using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.Dedicated
{
    public class ArtifactTagsMap
    {
        public int Id { get; set; }
        public int ArtifactId { get; set; }
        public int TagId { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
    }
}
