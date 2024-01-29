using AuthBoard.Data;
using AuthBoard.Models;
using AuthBoard.ViewModels.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Linq;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using AuthBoard.Utils;
using Google.Authenticator;

namespace AuthBoard.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticateController : Controller
    {
        private readonly ILogger<AuthenticateController> _logger;
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;

        public AuthenticateController(ApplicationDbContext context, UserManager<User> userManager, ILogger<AuthenticateController> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null)
            {
                Log log = new Log
                {
                    SubjectId = user.Id,
                    Action = Models.Action.Login
                };

                if(await _userManager.GetLockoutEndDateAsync(user) <= DateTimeOffset.UtcNow)
                {
                    TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                    DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, cstZone);

                    await _userManager.SetLockoutEndDateAsync(user, null);
                    await _userManager.SetLockoutEnabledAsync(user, false);
                    Log logLockout = new Log
                    {
                        SubjectId = user.Id,
                        Action = Models.Action.LockoutDisable,
                        LoggedAt = cstTime
                    };

                    await _context.Logs.AddAsync(logLockout);
                    await _context.SaveChangesAsync();
                }

                if (!await _userManager.IsLockedOutAsync(user))
                {
                    if (await _userManager.CheckPasswordAsync(user, model.Password))
                    {
                        if (await _userManager.GetTwoFactorEnabledAsync(user))
                        {
                            if (string.IsNullOrWhiteSpace(model.Code))
                            {
                                return Ok(new ViewModels.Authentication.TokenResponseModel
                                {
                                    IsGenerated = false,
                                    IsAuthenticatorNeeded = true
                                });
                            }
                            else
                            {
                                if (user.IsEnabled)
                                {
                                    var authenticatorKey = await _userManager.GetAuthenticatorKeyAsync(user);
                                    if (authenticatorKey == null)
                                    {
                                        return StatusCode(403, new ViewModels.Authentication.TokenResponseModel
                                        {
                                            IsGenerated = false,
                                            Error = "2FA ключ не знайдено, хоча система вважає, що ключ існує. Зверніться до адміністратора."
                                        });
                                    }

                                    TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
                                    bool result = tfa.ValidateTwoFactorPIN(authenticatorKey, model.Code, TimeSpan.FromSeconds(30));
                                    if (result)
                                    {
                                        user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.Id == user.Id);
                                        JwtSecurityToken token = null;
                                        try
                                        {
                                            token = await BuildJWTToken(true, user, true);
                                        }
                                        catch (Exception e)
                                        {
                                            _logger.LogCritical("Error during login");
                                            _logger.LogCritical(e.Message);
                                            return StatusCode(500, new ViewModels.Authentication.TokenResponseModel
                                            {
                                                IsGenerated = false,
                                                Error = "Під час збереження контексту до бази - данних сталася помилка"
                                            });
                                        }
                                        await _userManager.ResetAccessFailedCountAsync(user);
                                        await _userManager.SetLockoutEnabledAsync(user, false);
                                        await _userManager.SetLockoutEndDateAsync(user, null);

                                        TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                                        DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, cstZone);
                                        log.LoggedAt = cstTime;
                                        await _context.Logs.AddAsync(log);
                                        await _context.SaveChangesAsync();

                                        return Ok(new ViewModels.Authentication.TokenResponseModel { IsGenerated = true, Token = new JwtSecurityTokenHandler().WriteToken(token) });
                                    }
                                    else
                                    {
                                        await _userManager.AccessFailedAsync(user);
                                        var fails = await _userManager.GetAccessFailedCountAsync(user);
                                        if (fails > 0 && fails % 3 == 0)
                                        {
                                            await _userManager.SetLockoutEnabledAsync(user, true);
                                            var lockout = TimeSpan.FromHours(fails);
                                            await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow + lockout);

                                            TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                                            DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, cstZone);

                                            Log logLockout = new Log
                                            {
                                                SubjectId = user.Id,
                                                Action = Models.Action.LockoutEnable,
                                                LoggedAt = cstTime
                                            };

                                            await _context.Logs.AddAsync(logLockout);
                                            await _context.SaveChangesAsync();

                                            return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                                            {
                                                IsGenerated = false,
                                                Error = $"Занадто багато спроб увійти! Ваш аккаунт заблоковано на {lockout.TotalHours} годин."
                                            });
                                        }
                                        return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                                        {
                                            IsGenerated = false,
                                            Error = $"Данні користувача не вірні! {((fails % 3) == 1 ? "2 спроби залишилося" : (fails % 3) == 2 ? "1 спроба залишилася" : "спроби вичерпані")} ."
                                        });
                                    }
                                }
                                return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                                {
                                    IsGenerated = false,
                                    Error = "Користувач видален"
                                });
                            }
                        }
                        if (user.IsEnabled)
                        {
                            user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.Id == user.Id);
                            JwtSecurityToken token = null;
                            try
                            {
                                token = await BuildJWTToken(true, user, true);
                            }
                            catch (Exception e)
                            {
                                _logger.LogCritical("Error during login");
                                _logger.LogCritical(e.Message);
                                return StatusCode(500, new ViewModels.Authentication.TokenResponseModel
                                {
                                    IsGenerated = false,
                                    Error = "Під час збереження контексту до бази - данних сталася помилка"
                                });
                            }
                            await _userManager.SetLockoutEndDateAsync(user, null);
                            await _userManager.SetLockoutEnabledAsync(user, false);
                            await _userManager.ResetAccessFailedCountAsync(user);

                            TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                            DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, cstZone);
                            log.LoggedAt = cstTime;
                            await _context.Logs.AddAsync(log);
                            await _context.SaveChangesAsync();

                            return Ok(new ViewModels.Authentication.TokenResponseModel { IsGenerated = true, Token = new JwtSecurityTokenHandler().WriteToken(token) });
                        }
                        return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                        {
                            IsGenerated = false,
                            Error = "Користувач видален"
                        });
                    }
                    else
                    {
                        await _userManager.AccessFailedAsync(user);
                        var fails = await _userManager.GetAccessFailedCountAsync(user);
                        if (fails > 0 && fails % 3 == 0)
                        {
                            TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                            DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, cstZone);

                            await _userManager.SetLockoutEnabledAsync(user, true);
                            var lockout = TimeSpan.FromHours(fails);
                            await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow + lockout);

                            Log logLockout = new Log
                            {
                                SubjectId = user.Id,
                                Action = Models.Action.LockoutEnable,
                                LoggedAt = cstTime
                            };

                            await _context.Logs.AddAsync(logLockout);
                            await _context.SaveChangesAsync();

                            return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                            {
                                IsGenerated = false,
                                Error = $"Занадто багато спроб увійти! Ваш аккаунт заблоковано на {lockout.TotalHours} годин."
                            });
                        }
                        return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                        {
                            IsGenerated = false,
                            Error = $"Данні користувача не вірні! {((fails % 3) == 1 ? "2 спроби залишилося" : (fails % 3) == 2 ? "1 спроба залишилася" : "спроби вичерпані")} ."
                        });
                    }
                }
                else
                {
                    if ((await _userManager.GetLockoutEndDateAsync(user)).Value > new DateTimeOffset(3000, 1, 1, 1, 1, 1, TimeSpan.Zero))
                    {
                        return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                        {
                            IsGenerated = false,
                            Error = $"Акаунт користувача заблоковано за вимогою адміністратора"
                        });
                    }
                    TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                    DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(new DateTime((await _userManager.GetLockoutEndDateAsync(user)).Value.Ticks), cstZone);

                    return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                    {
                        IsGenerated = false,
                        Error = $"Акаунт користувача заблоковано до {cstTime.ToString("dd.MM.yyyy HH:mm:ss")}"
                    });
                }
            }
            return Unauthorized(new ViewModels.Authentication.TokenResponseModel
            {
                IsGenerated = false,
                Error = "Данні користувача не вірні"
            });
        }

        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequestModel model)
        {
            var refreshToken = await _context.RefreshTokens.Include(rt => rt.User).FirstOrDefaultAsync(rt => rt.Token == model.Token);
            if (refreshToken != null)
            {
                if (refreshToken.User.UserName == model.Username)
                {
                    if(refreshToken.User.SessionStart.HasValue)
                    {
                        if(refreshToken.User.SessionStart.Value.AddDays(JWTOptions.JWTSessionMaxLifetimeDays) > DateTime.UtcNow)
                        {
                            if(refreshToken.IssuedAt < DateTime.UtcNow)
                            {
                                if(refreshToken.ExpiresAt > DateTime.UtcNow)
                                {
                                    if (refreshToken.User.IsEnabled)
                                    {
                                        if (!await _userManager.IsLockedOutAsync(refreshToken.User))
                                        {
                                            var user = await _context.Users.Include(u => u.Regions).FirstOrDefaultAsync(u => u.Id == refreshToken.User.Id);
                                            JwtSecurityToken token = null;
                                            try
                                            {
                                                token = await BuildJWTToken(false, user, model.IsRefreshNeeded);
                                            }
                                            catch (Exception e)
                                            {
                                                _logger.LogCritical(e.Message);
                                                return StatusCode(500, new ViewModels.Authentication.TokenResponseModel
                                                {
                                                    IsGenerated = false,
                                                    Error = "Під час збереження контексту до бази - данних сталася помилка"
                                                });
                                            }
                                            TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                                            DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                                            Log log = new Log
                                            {
                                                SubjectId = user.Id,
                                                Action = Models.Action.Refresh,
                                                LoggedAt = time
                                            };

                                            await _context.Logs.AddAsync(log);
                                            await _context.SaveChangesAsync();

                                            return Ok(new ViewModels.Authentication.TokenResponseModel { IsGenerated = true, Token = new JwtSecurityTokenHandler().WriteToken(token) });
                                        }
                                        if((await _userManager.GetLockoutEndDateAsync(refreshToken.User)).Value > new DateTimeOffset(3000, 1,1,1,1,1, TimeSpan.Zero)) {
                                            return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                                            {
                                                IsGenerated = false,
                                                Error = $"Акаунт користувача заблоковано за вимогою адміністратора"
                                            });
                                        }

                                        TimeZoneInfo cstZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                                        DateTime cstTime = TimeZoneInfo.ConvertTimeFromUtc(new DateTime((await _userManager.GetLockoutEndDateAsync(refreshToken.User)).Value.Ticks), cstZone);

                                        return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                                        {
                                            IsGenerated = false,
                                            Error = $"Акаунт користувача заблоковано до {cstTime.ToString("dd.MM.yyyy HH:mm:ss")}"
                                        });
                                    }
                                    return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                                    {
                                        IsGenerated = false,
                                        Error = "Користувач видален"
                                    });
                                }
                                return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                                {
                                    IsGenerated = false,
                                    Error = "Токен оновлення недійсний"
                                });
                            }
                            return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                            {
                                IsGenerated = false,
                                Error = $"Не активована сессія користувача. До активаціі: ${refreshToken.IssuedAt.Subtract(DateTime.UtcNow)}"
                            });
                        }
                        return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                        {
                            IsGenerated = false,
                            Error = "Сессія користувача потребує оновлення"
                        });
                    }
                    return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                    {
                        IsGenerated = false,
                        Error = "Недійсна сессія користувача"
                    });
                }
                return Unauthorized(new ViewModels.Authentication.TokenResponseModel
                {
                    IsGenerated = false,
                    Error = "Користувач не збігается з власником токена"
                });
            }
            return Unauthorized(new ViewModels.Authentication.TokenResponseModel
            {
                IsGenerated = false,
                Error = "Токен не знайдено"
            });
        }

        [Route("refresh/active")]
        [HttpPost]
        public async Task<IActionResult> IsRefreshTokenActive(ViewModels.Authentication.IsTokenActiveRequestModel model)
        {
            if(string.IsNullOrWhiteSpace(model.Token))
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = false,
                    IsActive = false,
                    IssuedAt = null,
                    ExpiresAt = null
                });
            }
            if(string.IsNullOrWhiteSpace(model.Username))
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = false,
                    IsActive = false,
                    IssuedAt = null,
                    ExpiresAt = null
                });
            }

            var refreshToken = await _context.RefreshTokens.Include(rt => rt.User).FirstOrDefaultAsync(rt => rt.Token == model.Token);
            if (refreshToken == null)
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = false,
                    IsActive = false,
                    IssuedAt = null,
                    ExpiresAt = null
                });
            }

            if(!refreshToken.User.IsEnabled)
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = true,
                    IsActive = false,
                    IssuedAt = refreshToken.IssuedAt,
                    ExpiresAt = refreshToken.ExpiresAt
                });
            }
            if(refreshToken.User.UserName != model.Username)
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = true,
                    IsActive = false,
                    IssuedAt = refreshToken.IssuedAt,
                    ExpiresAt = refreshToken.ExpiresAt
                });
            }
            if(!refreshToken.User.SessionStart.HasValue)
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = true,
                    IsActive = false,
                    IssuedAt = refreshToken.IssuedAt,
                    ExpiresAt = refreshToken.ExpiresAt
                });
            }
            if (refreshToken.User.SessionStart.Value > DateTime.UtcNow)
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = true,
                    IsActive = false,
                    IssuedAt = refreshToken.IssuedAt,
                    ExpiresAt = refreshToken.ExpiresAt
                });
            }
            if (refreshToken.User.SessionStart.Value.AddDays(JWTOptions.JWTSessionMaxLifetimeDays) < DateTime.UtcNow)
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = true,
                    IsActive = false,
                    IssuedAt = refreshToken.IssuedAt,
                    ExpiresAt = refreshToken.ExpiresAt
                });
            }
            if (refreshToken.IssuedAt > DateTime.UtcNow)
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = true,
                    IsActive = false,
                    IssuedAt = refreshToken.IssuedAt,
                    ExpiresAt = refreshToken.ExpiresAt
                });
            }
            if (refreshToken.ExpiresAt < DateTime.UtcNow)
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = true,
                    IsActive = false,
                    IssuedAt = refreshToken.IssuedAt,
                    ExpiresAt = refreshToken.ExpiresAt
                });
            }

            if(await _userManager.IsLockedOutAsync(refreshToken.User))
            {
                return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
                {
                    IsExists = true,
                    IsActive = false,
                    IssuedAt = refreshToken.IssuedAt,
                    ExpiresAt = refreshToken.ExpiresAt
                });
            }

            return Ok(new ViewModels.Authentication.IsTokenActiveResponseModel
            {
                IsExists = true,
                IsActive = true,
                IssuedAt = refreshToken.IssuedAt,
                ExpiresAt = refreshToken.ExpiresAt
            });
        }

        [Authorize]
        [Route("session/active")]
        [HttpGet]
        public async Task<IActionResult> IsSessionActive()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (user is not null)
                {
                    if(!user.IsEnabled)
                    {
                        return Ok(new ViewModels.Authentication.IsSessionActiveResponseModel
                        {
                            IsActive = false,
                            SessionStart = null,
                            SessionEnd = null
                        });
                    }

                    if(await _userManager.IsLockedOutAsync(user))
                    {
                        return Ok(new ViewModels.Authentication.IsSessionActiveResponseModel
                        {
                            IsActive = false,
                            SessionStart = null,
                            SessionEnd = null
                        });
                    }

                    if(!user.SessionStart.HasValue)
                    {
                        return Ok(new ViewModels.Authentication.IsSessionActiveResponseModel
                        {
                            IsActive = false,
                            SessionStart = null,
                            SessionEnd = null
                        });
                    }

                    if(user.SessionStart.Value > DateTime.UtcNow)
                    {
                        return Ok(new ViewModels.Authentication.IsSessionActiveResponseModel
                        {
                            IsActive = false,
                            SessionStart = user.SessionStart.Value,
                            SessionEnd = user.SessionStart.Value.AddDays(JWTOptions.JWTSessionMaxLifetimeDays)
                        });
                    }

                    if(user.SessionStart.Value.AddDays(JWTOptions.JWTSessionMaxLifetimeDays) < DateTime.UtcNow)
                    {
                        return Ok(new ViewModels.Authentication.IsSessionActiveResponseModel
                        {
                            IsActive = false,
                            SessionStart = user.SessionStart.Value,
                            SessionEnd = user.SessionStart.Value.AddDays(JWTOptions.JWTSessionMaxLifetimeDays)
                        });
                    }

                    return Ok(new ViewModels.Authentication.IsSessionActiveResponseModel
                    {
                        IsActive = true,
                        SessionStart = user.SessionStart.Value,
                        SessionEnd = user.SessionStart.Value.AddDays(JWTOptions.JWTSessionMaxLifetimeDays)
                    });
                }
                return Ok(new ViewModels.Authentication.IsSessionActiveResponseModel
                {
                    IsActive = false,
                    SessionStart = null,
                    SessionEnd = null
                });
            }
            return Ok(new ViewModels.Authentication.IsSessionActiveResponseModel
            {
                IsActive = false,
                SessionStart = null,
                SessionEnd = null
            });
        }

        [Authorize]
        [Route("logout")]
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (user is not null)
                {
                    var refreshToken = await _context.RefreshTokens.Where(rt => rt.UserId == user.Id).FirstOrDefaultAsync();
                    if(refreshToken is not null)
                    {
                        refreshToken.ExpiresAt = new DateTime(1970, 1, 1, 1, 1, 1);
                        user.SessionStart = null;

                        _context.RefreshTokens.Update(refreshToken);
                        _context.Users.Update(user);

                        try
                        {
                            await _context.SaveChangesAsync();
                        }
                        catch (Exception e)
                        {
                            _logger.LogCritical("Error during logout proccess");
                            _logger.LogCritical(e.Message);
                            return StatusCode(500, new ViewModels.Authentication.LogoutResponseModel
                            {
                                IsLoggedOut = false,
                                Error = "Під час збереження контексту до бази - данних сталася помилка"
                            });
                        }
                    }
                    else
                    {
                        return StatusCode(500, new ViewModels.Authentication.LogoutResponseModel
                        {
                            IsLoggedOut = false,
                            Error = "Немає сессії користувача"
                        });
                    }

                    TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                    DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                    Log log = new Log
                    {
                        SubjectId = user.Id,
                        Action = Models.Action.Logout,
                        LoggedAt = time
                    };

                    await _context.Logs.AddAsync(log);
                    await _context.SaveChangesAsync();

                    return Ok(new ViewModels.Authentication.LogoutResponseModel 
                    {
                        IsLoggedOut = true
                    });
                }
                return NotFound(new ViewModels.Authentication.LogoutResponseModel
                {
                    IsLoggedOut = false,
                    Error = "Користувач не знайден"
                });
            }
            return Unauthorized(new ViewModels.Authentication.LogoutResponseModel
            {
                IsLoggedOut = false,
                Error = "Користувач не війшов у систему"
            });
        }

        [Authorize]
        [Route("2fa/generate")]
        [HttpGet]
        public async Task<IActionResult> GenerateTOTPInstall()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (user is not null)
                {
                    if((await _userManager.GetTwoFactorEnabledAsync(user)))
                    {
                        return StatusCode(403, new ViewModels.Authentication.GenerateTOTPResponseModel
                        {
                            IsGenerated = false,
                            Error = "2FA вже увімкнено для цього аккаунту"
                        });
                    }

                    var authenticatorKey = await _userManager.GetAuthenticatorKeyAsync(user);
                    await _userManager.ResetAuthenticatorKeyAsync(user);
                    authenticatorKey = await _userManager.GetAuthenticatorKeyAsync(user);
                    TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
                    SetupCode setupInfo = tfa.GenerateSetupCode("Stopbattle Authentication Server", user.UserName.ToString(), authenticatorKey, false, 3);

                    return Ok(new ViewModels.Authentication.GenerateTOTPResponseModel
                    {
                        IsGenerated = true,
                        Error = null,
                        Key = setupInfo.ManualEntryKey,
                        QRCode = setupInfo.QrCodeSetupImageUrl
                    });
                }
                return NotFound(new ViewModels.Authentication.GenerateTOTPResponseModel
                {
                    IsGenerated = false,
                    Error = "Користувач не знайден"
                });
            }
            return Unauthorized(new ViewModels.Authentication.GenerateTOTPResponseModel
            {
                IsGenerated = false,
                Error = "Користувач не війшов у систему"
            });
        }

        [Authorize]
        [Route("2fa/install")]
        [HttpPost]
        public async Task<IActionResult> InstallTOTP(ViewModels.Authentication.InstallTOTPRequestModel request)
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (user is not null)
                {
                    if (user.UserName == request.Username)
                    {
                        if (await _userManager.GetTwoFactorEnabledAsync(user))
                        {
                            return StatusCode(403, new ViewModels.Authentication.InstallTOTPResponseModel
                            {
                                IsInstalled = false,
                                Error = "2FA вже увімкнено для цього аккаунту"
                            });
                        }

                        var authenticatorKey = await _userManager.GetAuthenticatorKeyAsync(user);
                        if (authenticatorKey == null)
                        {
                            return StatusCode(403, new ViewModels.Authentication.InstallTOTPResponseModel
                            {
                                IsInstalled = false,
                                Error = "2FA не увімкнено для цього аккаунту"
                            });
                        }

                        TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
                        bool result = tfa.ValidateTwoFactorPIN(authenticatorKey, request.Code, TimeSpan.FromSeconds(30));
                        if (result)
                        {
                            var twoFactorState = await _userManager.SetTwoFactorEnabledAsync(user, true);
                            if (twoFactorState.Succeeded)
                            {
                                TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                                DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                                Log log = new Log
                                {
                                    SubjectId = user.Id,
                                    Action = Models.Action.TOTPEnable,
                                    LoggedAt = time
                                };

                                await _context.Logs.AddAsync(log);
                                await _context.SaveChangesAsync();

                                return Ok(new ViewModels.Authentication.InstallTOTPResponseModel
                                {
                                    IsInstalled = true,
                                    Error = null
                                });
                            }
                            else
                            {
                                return StatusCode(500, new ViewModels.Authentication.InstallTOTPResponseModel
                                {
                                    IsInstalled = false,
                                    Error = "Помилка при спробі увімкнути двофакторну аутентифікацію"
                                });
                            }
                        }
                        else
                        {
                            return Unauthorized(new ViewModels.Authentication.InstallTOTPResponseModel
                            {
                                IsInstalled = false,
                                Error = "Код перевірки - не вірний. Якщо ви не можете завершити встановлення 2FA, попросіть адміністратора про реініціалізацію процессу встановлення 2FA"
                            });
                        }
                    }
                    return Unauthorized(new ViewModels.Authentication.InstallTOTPResponseModel
                    {
                        IsInstalled = false,
                        Error = "Користувач не війшов у систему"
                    });
                }
                return NotFound(new ViewModels.Authentication.InstallTOTPResponseModel
                {
                    IsInstalled = false,
                    Error = "Користувач не знайден"
                });
            }
            return Unauthorized(new ViewModels.Authentication.InstallTOTPResponseModel
            {
                IsInstalled = false,
                Error = "Користувач не війшов у систему"
            });
        }

        #region Tools
        [NonAction]
        private async Task<JwtSecurityToken> BuildJWTToken(bool isUserSessionRefreshNeeded, User user, bool isRefreshNeeded)
        {
            var dateTime = DateTime.UtcNow;

            var userRoles = await _userManager.GetRolesAsync(user);
            if (isUserSessionRefreshNeeded)
            {
                user.SessionStart = dateTime;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Version, "1.0-aleph"),
                new Claim("session_start", new DateTimeOffset(user.SessionStart.Value).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                new Claim("session_end", new DateTimeOffset(user.SessionStart.Value.AddDays(JWTOptions.JWTSessionMaxLifetimeDays)).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                new Claim("is_admin", (await _userManager.IsInRoleAsync(user, "admin")).ToString(), ClaimValueTypes.Boolean),
                new Claim("region_id", user.Regions[0].Id.ToString(), ClaimValueTypes.Integer64),
                new Claim("region", user.Regions[0].Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            if (!string.IsNullOrWhiteSpace(user.Email))
            {
                authClaims.Add(new Claim("email", user.Email));
            }

            if (!string.IsNullOrWhiteSpace(user.FirstName))
            {
                authClaims.Add(new Claim("first_name", user.FirstName));
            }

            if (!string.IsNullOrWhiteSpace(user.LastName))
            {
                authClaims.Add(new Claim("last_name", user.LastName));
            }

            if (!string.IsNullOrWhiteSpace(user.Patronymic))
            {
                authClaims.Add(new Claim("patronymic", user.Patronymic));
            }

            if (!string.IsNullOrWhiteSpace(user.Position))
            {
                authClaims.Add(new Claim("position", user.Position));
            }

            if (!string.IsNullOrWhiteSpace(user.Rank))
            {
                authClaims.Add(new Claim("rank", user.Rank));
            }

            authClaims.Add(new Claim("2fa", (await _userManager.GetTwoFactorEnabledAsync(user)).ToString(), ClaimValueTypes.Boolean));

            var refresh = await _context.RefreshTokens.Where(rt => rt.UserId == user.Id).FirstOrDefaultAsync();
            if (isRefreshNeeded)
            {
                
                var rt = SecurityTools.GetRandomString(124);
                while (await _context.RefreshTokens.FirstOrDefaultAsync(r => r.Token == rt) is not null)
                {
                    rt = SecurityTools.GetRandomString(124);
                }
                RefreshToken refreshToken = new RefreshToken
                {
                    IssuedAt = dateTime,
                    ExpiresAt = dateTime.AddDays(JWTOptions.JWTRefreshTokenLifetimeDays),
                    Token = rt,
                    UserId = user.Id
                };
                if(refresh is null)
                {
                    await _context.RefreshTokens.AddAsync(refreshToken);
                    refresh = refreshToken;
                }
                else
                {
                    refresh.IssuedAt = refreshToken.IssuedAt;
                    refresh.ExpiresAt = refreshToken.ExpiresAt;
                    refresh.Token = refreshToken.Token;
                    _context.RefreshTokens.Update(refresh);
                }
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    _logger.LogCritical("Error during registering user token");
                    _logger.LogCritical(e.Message);
                }
            }

            authClaims.Add(new Claim("refresh_token", refresh.Token));
            authClaims.Add(new Claim("refresh_token_nbf", new DateTimeOffset(refresh.IssuedAt).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64));
            authClaims.Add(new Claim("refresh_token_exp", new DateTimeOffset(refresh.ExpiresAt).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64));

            var token = new JwtSecurityToken(
                notBefore: dateTime,
                expires: dateTime.AddMinutes(JWTOptions.JWTAccessTokenLifetimeMinutes),
                audience: JWTOptions.JWTSubscriber,
                issuer: JWTOptions.JWTIssuer,
                claims: authClaims,
                signingCredentials: new SigningCredentials(JWTOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            return token;
        }
        #endregion Tools
    }
}