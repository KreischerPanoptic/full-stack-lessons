using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Users
{
    public class UpdateUserResponseModel
    {
        public bool IsUpdated { get; set; }
        public string Error { get; set; }
        public GetUserResponseModel User { get; set; }
    }
}
