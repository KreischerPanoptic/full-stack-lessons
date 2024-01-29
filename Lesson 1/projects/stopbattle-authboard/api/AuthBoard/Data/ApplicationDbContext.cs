using AuthBoard.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuthBoard.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, long>
    {
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Log> Logs { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Region>().HasData(
                new Region[]
                {
                    new Region { Id = 1, Name = "Центральний аппарат"},
                    new Region { Id = 2, Name = "Вінницька область"},
                    new Region { Id = 3, Name = "Волинська область"},
                    new Region { Id = 4, Name = "Дніпропетровська область"},
                    new Region { Id = 5, Name = "Донецька область"},
                    new Region { Id = 6, Name = "Житомирська область"},
                    new Region { Id = 7, Name = "Закарпатська область"},
                    new Region { Id = 8, Name = "Запорізька область"},
                    new Region { Id = 9, Name = "Івано-Франківська область"},
                    new Region { Id = 10, Name = "Київська область"},
                    new Region { Id = 11, Name = "м. Київ"},
                    new Region { Id = 12, Name = "Кіровоградська область"},
                    new Region { Id = 13, Name = "Луганська область"},
                    new Region { Id = 14, Name = "Львівська область"},
                    new Region { Id = 15, Name = "Миколаївська область"},
                    new Region { Id = 16, Name = "Одеська область"},
                    new Region { Id = 17, Name = "м. Одеса"},
                    new Region { Id = 18, Name = "Полтавська область"},
                    new Region { Id = 19, Name = "Рівненська область"},
                    new Region { Id = 20, Name = "Сумська область"},
                    new Region { Id = 21, Name = "Тернопільська область"},
                    new Region { Id = 22, Name = "Харківська область"},
                    new Region { Id = 23, Name = "Херсонська область"},
                    new Region { Id = 24, Name = "Хмельницька область"},
                    new Region { Id = 25, Name = "Черкаська область"},
                    new Region { Id = 26, Name = "Чернівецька область"},
                    new Region { Id = 27, Name = "Чернігівська область"},
                });
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>(entity => { entity.ToTable(name: "Users"); });
            modelBuilder.Entity<Role>(entity => { entity.ToTable(name: "Roles"); });

            var converter = new EnumToStringConverter<Models.Action>();

            modelBuilder
                .Entity<Log>()
                .Property(e => e.Action)
                .HasConversion(converter);
        }
    }
}
