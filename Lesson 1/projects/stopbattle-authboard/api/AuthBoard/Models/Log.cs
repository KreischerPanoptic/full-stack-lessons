using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthBoard.Models
{
    public class Log
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        [ForeignKey("Subject")]
        public long SubjectId { get; set; }
        public User Subject { get; set; }
        [ForeignKey("User")]
        public long? UserId { get; set; }
        public User User { get; set; }
        [ForeignKey("Region")]
        public long? RegionId { get; set; }
        public Region Region { get; set; }
        [ForeignKey("Role")]
        public long? RoleId { get; set; }
        public string Role { get; set; }
        public Action Action { get; set; }
        public DateTime LoggedAt { get; set; }
    }
}
