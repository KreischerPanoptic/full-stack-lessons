using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Authentication
{
    public class RefreshRequestModel
    {
        [Required(ErrorMessage = "Введіть токен оновлення")]
        [StringLength(124, MinimumLength = 124, ErrorMessage = "Невірний формат токену")]
        public string Token { get; set; }
        [Required(ErrorMessage = "Введіть логін користувача")]
        [RegularExpression(@"^(?=[a-zA-Z0-9._-]{3,30}$)(?!.*[_.-]{2})[^_.-].*[^_.-]$", ErrorMessage = "Невірний формат логіну")]
        public string Username { get; set; }
        [Required]
        public bool IsRefreshNeeded { get; set; }
    }
}
