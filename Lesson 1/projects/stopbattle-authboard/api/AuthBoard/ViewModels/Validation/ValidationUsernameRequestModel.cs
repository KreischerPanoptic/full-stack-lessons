using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Validation
{
    public class ValidationUsernameRequestModel
    {
        [Required]
        public string Username { get; set; }
    }
}
