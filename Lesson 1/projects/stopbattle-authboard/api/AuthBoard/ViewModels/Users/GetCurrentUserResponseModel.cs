using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Users
{
    public class GetCurrentUserResponseModel
    {
        public bool IsLoggedIn { get; set; }
        public GetUserResponseModel User { get; set; }
    }
}
