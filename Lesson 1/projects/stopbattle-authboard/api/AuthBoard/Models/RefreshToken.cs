using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.Models
{
    [Index(nameof(Token), IsUnique = true, Name = "IX_RefreshToken_Token")]
    public class RefreshToken
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [ConcurrencyCheck]
        public string Token { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }
        [ConcurrencyCheck]
        public DateTime IssuedAt { get; set; }
        [ConcurrencyCheck]
        public DateTime ExpiresAt { get; set; }
    }
}
