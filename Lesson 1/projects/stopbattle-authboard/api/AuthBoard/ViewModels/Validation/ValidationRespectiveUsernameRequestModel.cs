using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Validation
{
    public class ValidationRespectiveUsernameRequestModel
    {
        [Required]
        public long Id { get; set; }
        [Required]
        public string Username { get; set; }
    }
}
