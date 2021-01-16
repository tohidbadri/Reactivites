using System;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public object DataBase { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Value>()
                    .HasData(
            new Value() { ID = 1, Name = "Tohid" },
            new Value() { ID = 2, Name = "Atefeh" },
            new Value() { ID = 3, Name = "ALi" }
            );
        }
    }
}