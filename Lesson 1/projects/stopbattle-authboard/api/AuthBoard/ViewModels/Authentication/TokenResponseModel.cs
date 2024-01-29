using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Authentication
{
    public class TokenResponseModel
    {
        public bool IsGenerated { get; set; }
        public bool IsAuthenticatorNeeded { get; set; } = false;
        public string Error { get; set; }
        public string Token { get; set; }
    }
}
