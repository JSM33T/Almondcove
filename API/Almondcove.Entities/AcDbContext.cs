using Almondcove.Entities.Dedicated;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Almondcove.Entities
{
    public class AcDbContext : DbContext
    {
        public AcDbContext(DbContextOptions<AcDbContext> options)
        : base(options)
        {
        }

        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure entity properties, relationships, etc. here
            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.MessageText).IsRequired().HasMaxLength(500);
                entity.Property(e => e.DateAdded).IsRequired();
            });
        }
    }
}
