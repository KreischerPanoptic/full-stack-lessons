using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Regions
{
    public class GetRegionResponseModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long UsersCount { get; set; }
        public bool IsArchived { get; set; } = false;
    }
}
