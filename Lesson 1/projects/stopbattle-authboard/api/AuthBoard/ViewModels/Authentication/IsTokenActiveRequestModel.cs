using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Authentication
{
    public class IsTokenActiveRequestModel
    {
        public string Token { get; set; }
        public string Username { get; set; }
    }
}
