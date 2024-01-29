using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Users
{
    public class GetUserResponseModel
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public string Position { get; set; }
        public string Rank { get; set; }
        public long RegionId { get; set; }
        public string Region { get; set; }
        public bool IsEnabled { get; set; } = true;
        public bool IsTOTPEnabled { get; set; } = false;
        public bool IsLockedOut { get; set; } = false;
        public string Role { get; set; }
    }
}
