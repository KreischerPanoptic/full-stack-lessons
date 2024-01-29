using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Users
{
    public class GetUserRoleResponseModel
    {
        public bool? IsAdmin { get; set; }
        public string Role { get; set; }
    }
}
