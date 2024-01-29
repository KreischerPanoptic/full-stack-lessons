using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Authentication
{
    public class LoginRequestModel
    {
        [Required(ErrorMessage = "Введіть логін користувача")]
        [RegularExpression(@"^(?=[a-zA-Z0-9._-]{3,30}$)(?!.*[_.-]{2})[^_.-].*[^_.-]$", ErrorMessage = "Невірний формат логіну")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Введіть пароль користувача")]
        [DataType(DataType.Password)]
        [RegularExpression(@"[a-zA-Z0-9~`!@#$%^&*()_\-+={}[\]|\\\/;:'?.,><]{8,120}", ErrorMessage = "Невірний формат пароля")]
        public string Password { get; set; }
#nullable enable
        [RegularExpression("^[0-9]{1,6}$", ErrorMessage = "Невірний формат 2FA токену")]
        public string? Code { get; set; }
#nullable disable
        [Required]
        public bool RememberMe { get; set; }
    }
}
