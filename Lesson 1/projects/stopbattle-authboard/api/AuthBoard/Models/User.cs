using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.Models
{
    public class User : IdentityUser<long>
    {
        [ConcurrencyCheck]
        public string FirstName { get; set; }
        [ConcurrencyCheck]
        public string LastName { get; set; }
        [ConcurrencyCheck]
        public string Patronymic { get; set; }
        [ConcurrencyCheck]
        public string Position { get; set; }
        [ConcurrencyCheck]
        public string Rank { get; set; }
        public bool IsEnabled { get; set; } = true;
        [ConcurrencyCheck]
        public RefreshToken RefreshToken { get; set; }
        public List<Region> Regions { get; set; } = new List<Region>();
        [ConcurrencyCheck]
        public DateTime? SessionStart { get; set; }
    }
}
