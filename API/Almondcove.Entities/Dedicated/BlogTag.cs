﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.Dedicated
{
    public class BlogTag
    {
        public int Id { get; set; }
        public string BlogTagName { get; set; }
        public string Slug { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
    }
}
