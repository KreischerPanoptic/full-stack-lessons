using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.Models
{
    public class Region
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [ConcurrencyCheck]
        public string Name { get; set; }
        public List<User> Users { get; set; } = new List<User>();
        [ConcurrencyCheck]
        public bool IsArchived { get; set; } = false;
    }
}
