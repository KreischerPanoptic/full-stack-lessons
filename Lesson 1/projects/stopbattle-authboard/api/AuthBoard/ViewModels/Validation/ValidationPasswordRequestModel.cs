using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Validation
{
    public class ValidationPasswordRequestModel
    {
        [Required]
        public string Password { get; set; }
    }
}
