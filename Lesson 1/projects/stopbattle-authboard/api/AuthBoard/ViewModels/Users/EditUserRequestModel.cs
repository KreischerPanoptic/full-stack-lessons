using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Users
{
    public class EditUserRequestModel
    {
#nullable enable
        [RegularExpression(@"[А-ЯЇІЄ]{1,1}[а-яїіє]{1,20}", ErrorMessage = "Невірний формат імені")]
        public string? FirstName { get; set; }
        [RegularExpression(@"[А-ЯЇІЄ]{1,1}[а-яїіє]{1,34}", ErrorMessage = "Невірний формат прізвища")]
        public string? LastName { get; set; }
        [RegularExpression(@"[А-ЯЇІЄ]{1,1}[а-яїіє]{1,39}", ErrorMessage = "Невірний формат імені по батькові")]
        public string? Patronymic { get; set; }
        [StringLength(250, ErrorMessage = "Занадто довга назва посади")]
        public string? Position { get; set; }
        [StringLength(250, ErrorMessage = "Занадто довга назва звання")]
        public string? Rank { get; set; }
        [RegularExpression(@"[a-zA-Z0-9~`!@#$%^&*()_\-+={}[\]|\\\/;:'?.,><]{8,120}", ErrorMessage = "Невірний формат пароля")]
        public string? Password { get; set; }
        [RegularExpression(@"[a-zA-Z0-9~`!@#$%^&*()_\-+={}[\]|\\\/;:'?.,><]{8,120}", ErrorMessage = "Невірний формат пароля")]
        public string? NewPassword { get; set; }
        [Compare("NewPassword", ErrorMessage = "Підтвердження пароля та пароль не збігаються")]
        public string? ConfirmNewPassword { get; set; }
#nullable disable
    }
}
