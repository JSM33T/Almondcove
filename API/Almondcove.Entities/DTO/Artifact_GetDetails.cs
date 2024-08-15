using Almondcove.Entities.Dedicated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.DTO
{
    public class Artifact_GetDetails
    {
        public int ArtifactId { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public ArtifactType Type { get; set; }
        public List<ArtifactTag> Tags { get; set; }
        public List<ArtifactSeries> Series{ get; set; }
    }
}
