using System.ComponentModel.DataAnnotations;

namespace AuthBoard.ViewModels.Authentication
{
    public class InstallTOTPRequestModel
    {
        [Required(ErrorMessage = "Введіть логін користувача")]
        [RegularExpression(@"^(?=[a-zA-Z0-9._-]{3,30}$)(?!.*[_.-]{2})[^_.-].*[^_.-]$", ErrorMessage = "Невірний формат логіну")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Введіть код")]
        [RegularExpression("^[0-9]{1,6}$", ErrorMessage = "Невірний формат 2FA токену")]
        public string Code { get; set; }
    }
}
