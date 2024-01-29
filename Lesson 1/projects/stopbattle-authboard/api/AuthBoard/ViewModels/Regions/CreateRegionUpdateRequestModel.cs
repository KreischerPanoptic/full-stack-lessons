using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Regions
{
    public class CreateRegionUpdateRequestModel
    {
        [Required]
        [StringLength(150, ErrorMessage = "Занадто довга назва регіона")]
        public string Name { get; set; }
    }
}
