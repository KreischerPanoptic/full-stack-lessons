using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.ViewModels.Users
{
    public class CreateUserRequestModel
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
#nullable disable
        [Required(ErrorMessage = "Оберіть логін для нового користувача")]
        [RegularExpression(@"^(?=[a-zA-Z0-9._-]{3,30}$)(?!.*[_.-]{2})[^_.-].*[^_.-]$", ErrorMessage = "Невірний формат логіну")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Оберіть пароль для нового користувача")]
        [RegularExpression(@"[a-zA-Z0-9~`!@#$%^&*()_\-+={}[\]|\\\/;:'?.,><]{8,120}", ErrorMessage = "Невірний формат пароля")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Підтвердіть пароль для нового користувача")]
        [Compare("Password", ErrorMessage = "Підтвердження пароля та пароль не збігаються")]
        public string ConfirmPassword { get; set; }
        [Required(ErrorMessage = "Регіон нового користувача має бути обраним на цьому етапі")]
        [Range(1, long.MaxValue, ErrorMessage = "Такого регіону не может існувати у системі")]
        public long RegionId { get; set; }
        [Required(ErrorMessage = "Оберіть роль для нового користувача")]
        [RegularExpression(@"^(reader|creator|volunteer)$", ErrorMessage = "Невірний формат ролі")]
        public string Role { get; set; }
    }
}
