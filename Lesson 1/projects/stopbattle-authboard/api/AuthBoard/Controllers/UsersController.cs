using AuthBoard.Data;
using AuthBoard.Models;
using AuthBoard.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AuthBoard.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ValidationTools _tools;

        public UsersController(ApplicationDbContext context, UserManager<User> userManager, ILogger<UsersController> logger, ValidationTools tools)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
            _tools = tools;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] bool active = true, [FromQuery] bool archived = false, [FromQuery] int page = 1, [FromQuery] int amount = -1)
        {
            List<ViewModels.Users.GetUserResponseModel> users = new List<ViewModels.Users.GetUserResponseModel>();
            List<User> userEntities = new List<User>();
            if (active && !archived)
            {
                userEntities = await _context.Users.Include(u => u.Regions).Where(u => u.IsEnabled && u.Regions.First().Id != 1).ToListAsync();
            }
            else if (!active && archived)
            {
                userEntities = await _context.Users.Include(u => u.Regions).Where(u => !u.IsEnabled && u.Regions.First().Id != 1).ToListAsync();
            }
            else if (active && archived)
            {
                userEntities = await _context.Users.Include(u => u.Regions).Where(u => u.Regions.First().Id != 1).ToListAsync();
            }

            var count = userEntities.LongCount();
            if (amount > 0)
            {
                userEntities = userEntities.Skip((page - 1) * amount).Take(amount).ToList();
            }

            foreach (var user in userEntities)
            {
                users.Add
                (
                    new ViewModels.Users.GetUserResponseModel
                    {
                        Id = user.Id,
                        Username = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Patronymic = user.Patronymic,
                        Position = user.Position,
                        Rank = user.Rank,
                        RegionId = user.Regions.First().Id,
                        Region = user.Regions.First().Name,
                        Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault(),
                        IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                        IsLockedOut = await _userManager.IsLockedOutAsync(user),
                        IsEnabled = user.IsEnabled
                    }
                );
            }
            return Ok(new ViewModels.Users.GetUsersResponseModel() {
                Count = count,
                Page = page,
                Amount = amount,
                Users = users.ToArray()
            });
        }

        [Route("{id:long:min(1)}")]
        [HttpGet]
        public async Task<IActionResult> GetUser([FromRoute] long id)
        {
            User user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.Id == id);
            if (user is not null)
            {
                ViewModels.Users.GetUserResponseModel userView = new ViewModels.Users.GetUserResponseModel
                {
                    Id = user.Id,
                    Username = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Patronymic = user.Patronymic,
                    Position = user.Position,
                    Rank = user.Rank,
                    RegionId = user.Regions.First().Id,
                    Region = user.Regions.First().Name,
                    Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault(),
                    IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                    IsLockedOut = await _userManager.IsLockedOutAsync(user),
                    IsEnabled = user.IsEnabled
                };
                return Ok(userView);
            }
            return NotFound(new ViewModels.Users.GetUserResponseModel { Id = id });
        }

        [Route("filter")]
        [HttpPost]
        public async Task<IActionResult> FilterUsers([FromBody] ViewModels.Users.FilterUsersRequestModel model, [FromQuery] bool active = true, [FromQuery] bool archived = false, [FromQuery] int page = 1, [FromQuery] int amount = -1)
        {
            List<ViewModels.Users.GetUserResponseModel> users = new List<ViewModels.Users.GetUserResponseModel>();
            List<User> userEntities = new List<User>();
            if (active && !archived)
            {
                userEntities = await _context.Users.Include(u => u.Regions).Where(u => u.IsEnabled && u.Regions.First().Id != 1).ToListAsync();
            }
            else if (!active && archived)
            {
                userEntities = await _context.Users.Include(u => u.Regions).Where(u => !u.IsEnabled && u.Regions.First().Id != 1).ToListAsync();
            }
            else if (active && archived)
            {
                userEntities = await _context.Users.Include(u => u.Regions).Where(u => u.Regions.First().Id != 1).ToListAsync();
            }

            List<User> prepared = new List<User>();
            List<User> filteredByUsername = new List<User>();
            foreach (var user in model.Usernames)
            {
                filteredByUsername.AddRange(userEntities.Where(u => u.UserName == user));
            }

            List<User> filteredByRegion = new List<User>();
            foreach (var region in model.Regions)
            {
                filteredByRegion.AddRange(userEntities.Where(u => u.Regions[0].Name == region));
            }
            List<User> filteredByRole = new List<User>();
            foreach (var role in model.Roles)
            {
                foreach (var user in userEntities)
                {
                    if(await _userManager.IsInRoleAsync(user, role))
                    {
                        filteredByRole.Add(user);
                    }
                }
            }
            List<User> filteredByLastName = new List<User>();
            foreach (var ln in model.LastNames)
            {
                filteredByLastName.AddRange(userEntities.Where(u => u.LastName == ln));
            }
            List<User> filteredByFirstName = new List<User>();
            foreach(var fn in model.FirstNames) {
                filteredByFirstName.AddRange(userEntities.Where(u => u.FirstName == fn));
            }
            var filtered = new List<List<User>>() { filteredByUsername, filteredByRegion, filteredByRole, filteredByLastName, filteredByFirstName };
            prepared = IntersectNonEmpty(filtered).ToList();

            var filters = new List<List<string>>() { model.Usernames.ToList(), model.Regions.ToList(), model.Roles.ToList(), model.LastNames.ToList(), model.FirstNames.ToList() };
            if (filters.Any(f => f.Count > 0))
            {
                userEntities = prepared;
            }

            var count = userEntities.LongCount();
            if (amount > 0)
            {
                userEntities = userEntities.Skip((page - 1) * amount).Take(amount).ToList();
            }

            foreach (var user in userEntities)
            {
                users.Add
                (
                    new ViewModels.Users.GetUserResponseModel
                    {
                        Id = user.Id,
                        Username = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Patronymic = user.Patronymic,
                        Position = user.Position,
                        Rank = user.Rank,
                        RegionId = user.Regions.First().Id,
                        Region = user.Regions.First().Name,
                        Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault(),
                        IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                        IsLockedOut = await _userManager.IsLockedOutAsync(user),
                        IsEnabled = user.IsEnabled
                    }
                );
            }
            return Ok(new ViewModels.Users.GetUsersResponseModel()
            {
                Count = count,
                Page = page,
                Amount = amount,
                Users = users.ToArray()
            });
        }

        [Route("current")]
        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (user is not null)
                {
                    ViewModels.Users.GetUserResponseModel userView = new ViewModels.Users.GetUserResponseModel
                    {
                        Id = user.Id,
                        Username = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Patronymic = user.Patronymic,
                        Position = user.Position,
                        Rank = user.Rank,
                        RegionId = user.Regions.First().Id,
                        Region = user.Regions.First().Name,
                        Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault(),
                        IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                        IsLockedOut = await _userManager.IsLockedOutAsync(user),
                        IsEnabled = user.IsEnabled
                    };
                    return Ok(new ViewModels.Users.GetCurrentUserResponseModel { IsLoggedIn = true, User = userView });
                }
                return NotFound(new ViewModels.Users.GetCurrentUserResponseModel { IsLoggedIn = true, User = new ViewModels.Users.GetUserResponseModel { Username = User.Identity.Name } });
            }
            return Unauthorized(new ViewModels.Users.GetCurrentUserResponseModel { IsLoggedIn = false });
        }

        [Route("current/is_admin")]
        [HttpGet]
        public async Task<IActionResult> GetUserRole()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (user is not null)
                {
                    if (await _userManager.IsInRoleAsync(user, "admin"))
                    {
                        return Ok(new ViewModels.Users.GetUserRoleResponseModel
                        {
                            IsAdmin = true,
                            Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault()
                        });
                    }
                    else
                    {
                        return Ok(new ViewModels.Users.GetUserRoleResponseModel
                        {
                            IsAdmin = false,
                            Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault()
                        });
                    }
                }
                return NotFound(new ViewModels.Users.GetUserRoleResponseModel
                {
                    IsAdmin = null
                });
            }
            return Unauthorized(new ViewModels.Users.GetUserRoleResponseModel
            {
                IsAdmin = null
            });
        }

        [Authorize(Roles = "admin")]
        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] ViewModels.Users.CreateUserRequestModel createUser)
        {
            if(!await _tools.IsActiveRegionExists(createUser.RegionId))
            {
                return StatusCode(403, new ViewModels.Users.CreateUserResponseModel { IsCreated = false, Error = "Такого регіону не існує" });
            }

            if(!await _tools.IsUsernameUnique(createUser.Username))
            {
                return StatusCode(403, new ViewModels.Users.CreateUserResponseModel { IsCreated = false, Error = "Користувач вже існує" });
            }

            if(!_tools.IsPasswordStrong(createUser.Password))
            {
                return StatusCode(403, new ViewModels.Users.CreateUserResponseModel { IsCreated = false, Error = "Пароль занадто простий" });
            }

            if(!_tools.IsPasswordSatisfyPolicy(createUser.Password))
            {
                return StatusCode(403, new ViewModels.Users.CreateUserResponseModel { IsCreated = false, Error = "Пароль не задовольняє вимогам політики безпеки" });
            }

            if (createUser.Password != createUser.ConfirmPassword)
            {
                return StatusCode(403, new ViewModels.Users.CreateUserResponseModel { IsCreated = false, Error = "Підтвердження пароля та пароль не збігаються" });
            }

            if((await _context.Roles.FirstOrDefaultAsync(r => r.Name == createUser.Role)) is null || createUser.Role == "admin")
            {
                return StatusCode(403, new ViewModels.Users.CreateUserResponseModel { IsCreated = false, Error = "Роль не існує" });
            }

            User create = new User
            {
                UserName = createUser.Username,
                FirstName = createUser.FirstName,
                LastName = createUser.LastName,
                Patronymic = createUser.Patronymic,
                Position = createUser.Position,
                Rank = createUser.Rank,
                IsEnabled = true
            };
            create.Regions.Add(await _context.Regions.FirstAsync(r => r.Id == createUser.RegionId));
            var createResult = await _userManager.CreateAsync(create, createUser.Password);
            if(!createResult.Succeeded)
            {
                return StatusCode(500, new ViewModels.Users.CreateUserResponseModel { IsCreated = false, Error = "Під час створення користувача - сталася помилка" });
            }
            var addToRoleResult = await _userManager.AddToRoleAsync(create, createUser.Role);
            if (!addToRoleResult.Succeeded)
            {
                return StatusCode(500, new ViewModels.Users.CreateUserResponseModel { IsCreated = false, Error = "Під час встановлення прав користувача - сталася помилка" });
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return StatusCode(500, new ViewModels.Users.CreateUserResponseModel { IsCreated = false, Error = "Під час збереження контексту до бази данних - сталася помилка" });
            }

            var usr = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
            if (usr is not null)
            {
                TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                Log log = new Log
                {
                    SubjectId = usr.Id,
                    Action = Models.Action.Create,
                    LoggedAt = time,
                    UserId = create.Id,
                };

                Log roleLog = new Log
                {
                    SubjectId = usr.Id,
                    Action = Models.Action.Role,
                    LoggedAt = time,
                    UserId = create.Id,
                    RoleId = (await _context.Roles.FirstOrDefaultAsync(r => r.Name == createUser.Role)).Id,
                    Role = createUser.Role
                };

                await _context.Logs.AddAsync(log);
                await _context.Logs.AddAsync(roleLog);
                await _context.SaveChangesAsync();
            }

            return Ok(new ViewModels.Users.CreateUserResponseModel
            {
                IsCreated = true,
                User = new ViewModels.Users.GetUserResponseModel
                {
                    Id = create.Id,
                    Username = create.UserName,
                    FirstName = create.FirstName,
                    LastName = create.LastName,
                    Patronymic = create.Patronymic,
                    Position = create.Position,
                    Rank = create.Rank,
                    Role = (await _userManager.GetRolesAsync(create)).FirstOrDefault(),
                    RegionId = createUser.RegionId,
                    Region = create.Regions.First().Name,
                    IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(create),
                    IsLockedOut = await _userManager.IsLockedOutAsync(create),
                    IsEnabled = create.IsEnabled
                }
            });
        }

        [Authorize(Roles = "admin")]
        [Route("update/{id:long:min(1)}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromRoute] long id, [FromBody] ViewModels.Users.UpdateUserRequestModel updateUser)
        {
            var user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.Id == id && u.IsEnabled);
            if (user is not null)
            {
                if (!string.IsNullOrWhiteSpace(updateUser.Username) && user.UserName != updateUser.Username)
                {
                    if (!await _tools.IsUsernameUnique(updateUser.Username))
                    {
                        return StatusCode(403, new ViewModels.Users.UpdateUserResponseModel { IsUpdated = false, Error = "Користувач з таким логіном вже існує",
                            User = new ViewModels.Users.GetUserResponseModel
                            {
                                Id = id
                            }
                        });
                    }

                    var updateUsernameResult = await _userManager.SetUserNameAsync(user, updateUser.Username);
                    if (!updateUsernameResult.Succeeded)
                    {
                        return StatusCode(500, new ViewModels.Users.UpdateUserResponseModel
                        {
                            IsUpdated = false,
                            Error = "Під час зміни логіна користувача - сталася помилка",
                            User = new ViewModels.Users.GetUserResponseModel
                            {
                                Id = id
                            }
                        });
                    }
                    await _userManager.UpdateNormalizedUserNameAsync(user);
                }

                if (!string.IsNullOrWhiteSpace(updateUser.FirstName) && user.FirstName != updateUser.FirstName)
                {
                    user.FirstName = updateUser.FirstName;
                }

                if (!string.IsNullOrWhiteSpace(updateUser.LastName) && user.LastName != updateUser.LastName)
                {
                    user.LastName = updateUser.LastName;
                }

                if (!string.IsNullOrWhiteSpace(updateUser.Patronymic) && user.Patronymic != updateUser.Patronymic)
                {
                    user.Patronymic = updateUser.Patronymic;
                }

                if (!string.IsNullOrWhiteSpace(updateUser.Position) && user.Position != updateUser.Position)
                {
                    user.Position = updateUser.Position;
                }

                if (!string.IsNullOrWhiteSpace(updateUser.Rank) && user.Rank != updateUser.Rank)
                {
                    user.Rank = updateUser.Rank;
                }

                bool isRoleUpdated = false;

                if(!string.IsNullOrWhiteSpace(updateUser.Role) && (await _userManager.GetRolesAsync(user)).FirstOrDefault() != updateUser.Role)
                {
                    var rolesToRemove = await _userManager.GetRolesAsync(user);
                    var removeRoleResult = await _userManager.RemoveFromRolesAsync(user, rolesToRemove);
                    if (!removeRoleResult.Succeeded)
                    {
                        return StatusCode(500, new ViewModels.Users.UpdateUserResponseModel { IsUpdated = false, Error = "Під час встановлення прав користувача - сталася помилка" });
                    }

                    var addToRoleResult = await _userManager.AddToRoleAsync(user, updateUser.Role);
                    if (!addToRoleResult.Succeeded)
                    {
                        return StatusCode(500, new ViewModels.Users.UpdateUserResponseModel { IsUpdated = false, Error = "Під час встановлення прав користувача - сталася помилка" });
                    }
                    isRoleUpdated = true;
                }

                if (!string.IsNullOrWhiteSpace(updateUser.Password) && !string.IsNullOrWhiteSpace(updateUser.ConfirmPassword))
                {
                    if (updateUser.Password == updateUser.ConfirmPassword)
                    {
                        if (!await _userManager.CheckPasswordAsync(user, updateUser.Password))
                        {
                            if (!_tools.IsPasswordStrong(updateUser.Password))
                            {
                                return StatusCode(403, new ViewModels.Users.UpdateUserResponseModel { IsUpdated = false, Error = "Пароль занадто простий",
                                    User = new ViewModels.Users.GetUserResponseModel
                                    {
                                        Id = id
                                    }
                                });
                            }

                            if (!_tools.IsPasswordSatisfyPolicy(updateUser.Password))
                            {
                                return StatusCode(403, new ViewModels.Users.UpdateUserResponseModel { IsUpdated = false, Error = "Пароль не задовольняє вимогам політики безпеки",
                                    User = new ViewModels.Users.GetUserResponseModel
                                    {
                                        Id = id
                                    }
                                });
                            }

                            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                            var changePasswordResult = await _userManager.ResetPasswordAsync(user, token, updateUser.Password);
                            if (!changePasswordResult.Succeeded)
                            {
                                return StatusCode(500, new ViewModels.Users.UpdateUserResponseModel
                                {
                                    IsUpdated = false,
                                    Error = "Під час зміни пароля користувача - сталася помилка",
                                    User = new ViewModels.Users.GetUserResponseModel
                                    {
                                        Id = id
                                    }
                                });
                            }
                        }
                    }
                    else
                    {
                        return StatusCode(403, new ViewModels.Users.UpdateUserResponseModel
                        {
                            IsUpdated = false,
                            Error = "Пароль та підтвердження не збігаються",
                            User = new ViewModels.Users.GetUserResponseModel
                            {
                                Id = id
                            }
                        });
                    }
                }

                if (updateUser.RegionId.HasValue)
                {
                    if (user.Regions.First().Id != updateUser.RegionId.Value)
                    {
                        if (!await _tools.IsActiveNullableRegionExists(updateUser.RegionId))
                        {
                            return StatusCode(403, new ViewModels.Users.UpdateUserResponseModel { IsUpdated = false, Error = "Такого регіону не існує",
                                User = new ViewModels.Users.GetUserResponseModel
                                {
                                    Id = id
                                }
                            });
                        }

                        user.Regions.Clear();
                        user.Regions.Add(await _context.Regions.FirstAsync(r => r.Id == updateUser.RegionId.Value));
                    }
                }

                _context.Users.Update(user);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    return StatusCode(500, new ViewModels.Users.UpdateUserResponseModel
                    {
                        IsUpdated = false,
                        Error = "Під час збереження контексту до бази данних - сталася помилка",
                        User = new ViewModels.Users.GetUserResponseModel
                        {
                            Id = id
                        }
                    });
                }

                var usr = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (usr is not null)
                {
                    TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                    DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                    Log log = new Log
                    {
                        SubjectId = usr.Id,
                        Action = Models.Action.Update,
                        LoggedAt = time,
                        UserId = user.Id,
                    };
                    await _context.Logs.AddAsync(log);

                    if (isRoleUpdated)
                    {
                        Log roleLog = new Log
                        {
                            SubjectId = usr.Id,
                            Action = Models.Action.Role,
                            LoggedAt = time,
                            UserId = user.Id,
                            RoleId = (await _context.Roles.FirstOrDefaultAsync(r => r.Name == updateUser.Role)).Id,
                            Role = updateUser.Role
                        };

                        await _context.Logs.AddAsync(roleLog);
                    }
                    await _context.SaveChangesAsync();
                }

                return Ok(new ViewModels.Users.UpdateUserResponseModel
                {
                    IsUpdated = true,
                    User = new ViewModels.Users.GetUserResponseModel
                    {
                        Id = user.Id,
                        Username = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Patronymic = user.Patronymic,
                        Position = user.Position,
                        Rank = user.Rank,
                        Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault(),
                        RegionId = user.Regions.First().Id,
                        Region = user.Regions.First().Name,
                        IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                        IsLockedOut = await _userManager.IsLockedOutAsync(user),
                        IsEnabled = user.IsEnabled
                    }
                });
            }
            return NotFound(new ViewModels.Users.UpdateUserResponseModel
            {
                IsUpdated = false,
                Error = $"Активного користувача з ID: {id} - не знайдено",
                User = new ViewModels.Users.GetUserResponseModel
                {
                    Id = id
                }
            });
        }

        [Route("edit/{id:long:min(1)}")]
        [HttpPatch]
        public async Task<IActionResult> EditUser([FromRoute] long id, [FromBody] ViewModels.Users.EditUserRequestModel editUser)
        {
            var user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.Id == id && u.IsEnabled);
            if (user is not null)
            {
                if (!string.IsNullOrWhiteSpace(editUser.FirstName) && user.FirstName != editUser.FirstName)
                {
                    user.FirstName = editUser.FirstName;
                }

                if (!string.IsNullOrWhiteSpace(editUser.LastName) && user.LastName != editUser.LastName)
                {
                    user.LastName = editUser.LastName;
                }

                if (!string.IsNullOrWhiteSpace(editUser.Patronymic) && user.Patronymic != editUser.Patronymic)
                {
                    user.Patronymic = editUser.Patronymic;
                }

                if (!string.IsNullOrWhiteSpace(editUser.Position) && user.Position != editUser.Position)
                {
                    user.Position = editUser.Position;
                }

                if (!string.IsNullOrWhiteSpace(editUser.Rank) && user.Rank != editUser.Rank)
                {
                    user.Rank = editUser.Rank;
                }


                if (!string.IsNullOrWhiteSpace(editUser.Password))
                {
                    if (await _userManager.CheckPasswordAsync(user, editUser.Password))
                    {
                        if (!string.IsNullOrWhiteSpace(editUser.NewPassword) && !string.IsNullOrWhiteSpace(editUser.ConfirmNewPassword))
                        {
                            if (editUser.NewPassword == editUser.ConfirmNewPassword)
                            {
                                if (!_tools.IsPasswordStrong(editUser.NewPassword))
                                {
                                    return StatusCode(403, new ViewModels.Users.UpdateUserResponseModel { IsUpdated = false, Error = "Пароль занадто простий",
                                        User = new ViewModels.Users.GetUserResponseModel
                                        {
                                            Id = id
                                        }
                                    });
                                }

                                if(!_tools.IsPasswordSatisfyPolicy(editUser.NewPassword))
                                {
                                    return StatusCode(403, new ViewModels.Users.UpdateUserResponseModel { IsUpdated = false, Error = "Пароль не задовольняє вимогам політики безпеки",
                                        User = new ViewModels.Users.GetUserResponseModel
                                        {
                                            Id = id
                                        }
                                    });
                                }

                                var changePasswordResult = await _userManager.ChangePasswordAsync(user, editUser.Password, editUser.NewPassword);
                                if (!changePasswordResult.Succeeded)
                                {
                                    return StatusCode(500, new ViewModels.Users.UpdateUserResponseModel
                                    {
                                        IsUpdated = false,
                                        Error = "Під час зміни пароля користувача - сталася помилка",
                                        User = new ViewModels.Users.GetUserResponseModel
                                        {
                                            Id = id
                                        }
                                    });
                                }
                            }
                            else
                            {
                                return StatusCode(403, new ViewModels.Users.UpdateUserResponseModel
                                {
                                    IsUpdated = false,
                                    Error = "Пароль та підтвердження не збігаються",
                                    User = new ViewModels.Users.GetUserResponseModel
                                    {
                                        Id = id
                                    }
                                });
                            }
                        }
                        else
                        {
                            return StatusCode(403, new ViewModels.Users.UpdateUserResponseModel
                            {
                                IsUpdated = false,
                                Error = "Пароль не задовольняє вимогам політики безпеки",
                                User = new ViewModels.Users.GetUserResponseModel
                                {
                                    Id = id
                                }
                            });
                        }
                    }
                    else
                    {
                        return Unauthorized(new ViewModels.Users.UpdateUserResponseModel
                        {
                            IsUpdated = false,
                            Error = "Неправильний поточний пароль користувача",
                            User = new ViewModels.Users.GetUserResponseModel
                            {
                                Id = id
                            }
                        });
                    }
                }

                _context.Users.Update(user);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    return StatusCode(500, new ViewModels.Users.UpdateUserResponseModel
                    {
                        IsUpdated = false,
                        Error = "Під час збереження контексту до бази данних - сталася помилка",
                        User = new ViewModels.Users.GetUserResponseModel
                        {
                            Id = id
                        }
                    });
                }

                var usr = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (usr is not null)
                {
                    TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                    DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                    Log log = new Log
                    {
                        SubjectId = usr.Id,
                        Action = Models.Action.Update,
                        LoggedAt = time,
                        UserId = user.Id,
                    };
                    await _context.Logs.AddAsync(log);
                    await _context.SaveChangesAsync();
                }

                return Ok(new ViewModels.Users.UpdateUserResponseModel
                {
                    IsUpdated = true,
                    User = new ViewModels.Users.GetUserResponseModel
                    {
                        Id = user.Id,
                        Username = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Patronymic = user.Patronymic,
                        Position = user.Position,
                        Rank = user.Rank,
                        Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault(),
                        RegionId = user.Regions.First().Id,
                        Region = user.Regions.First().Name,
                        IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                        IsLockedOut = await _userManager.IsLockedOutAsync(user),
                        IsEnabled = user.IsEnabled
                    }
                });
            }
            return NotFound(new ViewModels.Users.UpdateUserResponseModel
            {
                IsUpdated = false,
                Error = $"Активного користувача з ID: {id} не знайдено",
                User = new ViewModels.Users.GetUserResponseModel
                {
                    Id = id
                }
            });
        }

        [Authorize(Roles = "admin")]
        [Route("set/lockout/{id:long:min(1)}")]
        [HttpGet]
        public async Task<IActionResult> SetUserLockout([FromRoute] long id)
        {
            var user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.Id == id && u.IsEnabled);
            if (user is not null)
            {
                if (!await _userManager.IsInRoleAsync(user, "admin"))
                {
                    var lockoutStateChange = await _userManager.SetLockoutEnabledAsync(user, true);
                    var lockoutDateChange = await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.MaxValue);
                    if (!lockoutDateChange.Succeeded || !lockoutStateChange.Succeeded)
                    {
                        return StatusCode(500, new ViewModels.Users.SetUserSecurityResponseModel
                        {
                            IsSet = false,
                            Error = "Під час збереження контексту до бази данних - сталася помилка",
                            User = new ViewModels.Users.GetUserResponseModel
                            {
                                Id = id
                            }
                        });
                    }

                    var usr = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                    if (usr is not null)
                    {
                        TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                        DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                        Log log = new Log
                        {
                            SubjectId = usr.Id,
                            Action = Models.Action.LockoutEnable,
                            LoggedAt = time,
                            UserId = user.Id,
                        };
                        await _context.Logs.AddAsync(log);
                        await _context.SaveChangesAsync();
                    }

                    return Ok(new ViewModels.Users.SetUserSecurityResponseModel
                    {
                        IsSet = true,
                        User = new ViewModels.Users.GetUserResponseModel
                        {
                            Id = id,
                            Username = user.UserName,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Patronymic = user.Patronymic,
                            Position = user.Position,
                            Rank = user.Rank,
                            Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault(),
                            RegionId = user.Regions.First().Id,
                            Region = user.Regions.First().Name,
                            IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                            IsLockedOut = await _userManager.IsLockedOutAsync(user),
                            IsEnabled = user.IsEnabled
                        }
                    });
                }
                return StatusCode(403, new ViewModels.Users.SetUserSecurityResponseModel
                {
                    IsSet = false,
                    Error = "На жаль я не можу дозволити вам заблокувати адміністратора системи",
                    User = new ViewModels.Users.GetUserResponseModel
                    {
                        Id = id
                    }
                });
            }
            return NotFound(new ViewModels.Users.SetUserSecurityResponseModel
            {
                IsSet = false,
                Error = $"Активного користувача з ID: {id} - не знайдено",
                User = new ViewModels.Users.GetUserResponseModel
                {
                    Id = id
                }
            });
        }

        [Authorize(Roles = "admin")]
        [Route("reset/lockout/{id:long:min(1)}")]
        [HttpGet]
        public async Task<IActionResult> ResetUserLockout([FromRoute] long id)
        {
            var user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.Id == id && u.IsEnabled);
            if (user is not null)
            {
                if (!await _userManager.IsInRoleAsync(user, "admin"))
                {
                    var lockoutDateChange = await _userManager.SetLockoutEndDateAsync(user, null);
                    var lockoutStateChange = await _userManager.SetLockoutEnabledAsync(user, false);
                    var resetFailsState = await _userManager.ResetAccessFailedCountAsync(user);

                    if (!lockoutDateChange.Succeeded || !lockoutStateChange.Succeeded || !resetFailsState.Succeeded)
                    {
                        return StatusCode(500, new ViewModels.Users.ResetUserSecurityResponseModel
                        {
                            IsReset = false,
                            Error = "Під час збереження контексту до бази данних - сталася помилка",
                            User = new ViewModels.Users.GetUserResponseModel
                            {
                                Id = id
                            }
                        });
                    }

                    var usr = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                    if (usr is not null)
                    {
                        TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                        DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                        Log log = new Log
                        {
                            SubjectId = usr.Id,
                            Action = Models.Action.LockoutDisable,
                            LoggedAt = time,
                            UserId = user.Id,
                        };
                        await _context.Logs.AddAsync(log);
                        await _context.SaveChangesAsync();
                    }

                    return Ok(new ViewModels.Users.ResetUserSecurityResponseModel
                    {
                        IsReset = true,
                        User = new ViewModels.Users.GetUserResponseModel
                        {
                            Id = id,
                            Username = user.UserName,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Patronymic = user.Patronymic,
                            Position = user.Position,
                            Rank = user.Rank,
                            Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault(),
                            RegionId = user.Regions.First().Id,
                            Region = user.Regions.First().Name,
                            IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                            IsLockedOut = await _userManager.IsLockedOutAsync(user),
                            IsEnabled = user.IsEnabled
                        }
                    });
                }
                return StatusCode(403, new ViewModels.Users.ResetUserSecurityResponseModel
                {
                    IsReset = false,
                    Error = "На жаль я не можу дозволити вам разблокувати адміністратора системи",
                    User = new ViewModels.Users.GetUserResponseModel
                    {
                        Id = id
                    }
                });
            }
            return NotFound(new ViewModels.Users.ResetUserSecurityResponseModel
            {
                IsReset = false,
                Error = $"Активного користувача з ID: {id} - не знайдено",
                User = new ViewModels.Users.GetUserResponseModel
                {
                    Id = id
                }
            });
        }

        [Authorize(Roles = "admin")]
        [Route("reset/2fa/{id:long:min(1)}")]
        [HttpGet]
        public async Task<IActionResult> ResetUserTOTP([FromRoute] long id)
        {
            var user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.Id == id && u.IsEnabled);
            if (user is not null)
            {
                var totpStateChange = await _userManager.SetTwoFactorEnabledAsync(user, false);
                var totpKeyChange = await _userManager.ResetAuthenticatorKeyAsync(user);
                if (!totpStateChange.Succeeded || !totpKeyChange.Succeeded)
                {
                    return StatusCode(500, new ViewModels.Users.ResetUserSecurityResponseModel
                    {
                        IsReset = false,
                        Error = "Під час збереження контексту до бази данних - сталася помилка",
                        User = new ViewModels.Users.GetUserResponseModel
                        {
                            Id = id
                        }
                    });
                }

                var usr = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (usr is not null)
                {
                    TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                    DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                    Log log = new Log
                    {
                        SubjectId = usr.Id,
                        Action = Models.Action.TOTPDisable,
                        LoggedAt = time,
                        UserId = user.Id,
                    };
                    await _context.Logs.AddAsync(log);
                    await _context.SaveChangesAsync();
                }

                return Ok(new ViewModels.Users.ResetUserSecurityResponseModel
                {
                    IsReset = true,
                    User = new ViewModels.Users.GetUserResponseModel
                    {
                        Id = id,
                        Username = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Patronymic = user.Patronymic,
                        Position = user.Position,
                        Rank = user.Rank,
                        Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault(),
                        RegionId = user.Regions.First().Id,
                        Region = user.Regions.First().Name,
                        IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                        IsLockedOut = await _userManager.IsLockedOutAsync(user),
                        IsEnabled = user.IsEnabled
                    }
                });
            }
            return NotFound(new ViewModels.Users.ResetUserSecurityResponseModel
            {
                IsReset = false,
                Error = $"Активного користувача з ID: {id} - не знайдено",
                User = new ViewModels.Users.GetUserResponseModel
                {
                    Id = id
                }
            });
        }

        [Authorize(Roles = "admin")]
        [Route("remove/{id:long:min(1)}")]
        [HttpDelete]
        public async Task<IActionResult> RemoveUser([FromRoute] long id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id && u.IsEnabled);
            if (user is not null)
            {
                if (!await _userManager.IsInRoleAsync(user, "admin"))
                {
                    user.IsEnabled = false;
                    _context.Users.Update(user);
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch
                    {
                        return StatusCode(500, new ViewModels.Users.DeleteUserResponseModel
                        {
                            IsDeleted = false,
                            Error = "Під час збереження контексту до бази данних - сталася помилка",
                            User = new ViewModels.Users.GetUserResponseModel
                            {
                                Id = id
                            }
                        });
                    }

                    var usr = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                    if (usr is not null)
                    {
                        TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                        DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                        Log log = new Log
                        {
                            SubjectId = usr.Id,
                            Action = Models.Action.Delete,
                            LoggedAt = time,
                            UserId = user.Id,
                        };
                        await _context.Logs.AddAsync(log);
                        await _context.SaveChangesAsync();
                    }

                    return Ok(new ViewModels.Users.DeleteUserResponseModel
                    {
                        IsDeleted = true,
                        User = new ViewModels.Users.GetUserResponseModel
                        {
                            Id = id
                        }
                    });
                }
                return StatusCode(403, new ViewModels.Users.DeleteUserResponseModel
                {
                    IsDeleted = false,
                    Error = "На жаль я не можу дозволити вам видалити адміністратора системи",
                    User = new ViewModels.Users.GetUserResponseModel
                    {
                        Id = id
                    }
                });
            }
            return NotFound(new ViewModels.Users.DeleteUserResponseModel
            {
                IsDeleted = false,
                Error = $"Активного користувача з ID: {id} - не знайдено",
                User = new ViewModels.Users.GetUserResponseModel
                {
                    Id = id
                }
            });
        }

        #region Tools
        private IEnumerable<T> IntersectNonEmpty<T>(IEnumerable<IEnumerable<T>> lists)
        {
            var nonEmptyLists = lists.Where(l => l.Any());
            if (nonEmptyLists.Count() > 0)
            {
                return nonEmptyLists.Aggregate((l1, l2) => l1.Intersect(l2));
            }
            return new List<T>();
        }
        #endregion Tools
    }
}
