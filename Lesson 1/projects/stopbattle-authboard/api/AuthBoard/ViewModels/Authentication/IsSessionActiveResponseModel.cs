using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Authentication
{
    public class IsSessionActiveResponseModel
    {
        public bool IsActive { get; set; }
        public DateTime? SessionStart { get; set; }
        public DateTime? SessionEnd { get; set; }
    }
}
