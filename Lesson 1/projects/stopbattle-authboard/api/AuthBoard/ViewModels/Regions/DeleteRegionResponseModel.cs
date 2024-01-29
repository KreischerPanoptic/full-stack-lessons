using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Regions
{
    public class DeleteRegionResponseModel
    {
        public bool IsDeleted { get; set; }
        public string Error { get; set; }
        public GetRegionResponseModel Region { get; set; }
    }
}
