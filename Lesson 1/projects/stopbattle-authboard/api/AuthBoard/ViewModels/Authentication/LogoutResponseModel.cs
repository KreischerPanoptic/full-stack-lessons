using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Authentication
{
    public class LogoutResponseModel
    {
        public bool IsLoggedOut { get; set; }
        public string Error { get; set; }
    }
}
