using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.Dedicated
{
   
    

    public class Artifact
    {
        public int Id { get; set; }
        public string ArtifactName { get; set; }
        public string Slug { get; set; }
        public int TypeId { get; set; }
        public int CategoryId { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
    }

  

   
}
