using AuthBoard.Data;
using AuthBoard.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/logs")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly ILogger<LogsController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public LogsController(ApplicationDbContext context, ILogger<LogsController> logger, UserManager<User> userManager)
        {
            _context = context;
            _logger = logger;
            _userManager = userManager;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetLogs([FromQuery] int page = 1, [FromQuery] int amount = -1)
        {
            List<ViewModels.Logs.GetLogResponseModel> logs = new List<ViewModels.Logs.GetLogResponseModel>();
            List<Log> logsEntities = await _context.Logs.Include(l => l.Region).Include(l => l.Subject).ThenInclude(s => s.Regions).Include(l => l.User).ThenInclude(u => u.Regions).OrderByDescending(l => l.LoggedAt).ToListAsync();

            var count = logsEntities.LongCount();
            if (amount > 0)
            {
                logsEntities = logsEntities.Skip((page - 1) * amount).Take(amount).ToList();
            }
            foreach (var log in logsEntities)
            {
                logs.Add
                (
                    new ViewModels.Logs.GetLogResponseModel
                    {
                        Id = log.Id,
                        Action = log.Action,
                        LoggedAt = log.LoggedAt,
                        SubjectId = log.SubjectId,
                        Subject = new ViewModels.Users.GetUserResponseModel
                        {
                            Id = log.Subject.Id,
                            Username = log.Subject.UserName,
                            FirstName = log.Subject.FirstName,
                            LastName = log.Subject.LastName,
                            Patronymic = log.Subject.Patronymic,
                            Position = log.Subject.Position,
                            Rank = log.Subject.Rank,
                            RegionId = log.Subject.Regions.First().Id,
                            Region = log.Subject.Regions.First().Name,
                            Role = (await _userManager.GetRolesAsync(log.Subject)).FirstOrDefault(),
                            IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(log.Subject),
                            IsLockedOut = await _userManager.IsLockedOutAsync(log.Subject),
                            IsEnabled = log.Subject.IsEnabled
                        },
                        RegionId = log.RegionId,
                        Region = log.RegionId.HasValue ? new ViewModels.Regions.GetRegionResponseModel
                        {
                            Id = log.Region.Id,
                            Name = log.Region.Name,
                            IsArchived = log.Region.IsArchived
                        } : null,
                        RoleId = log.RoleId,
                        Role = log.RoleId.HasValue ? log.Role : null,
                        UserId = log.UserId,
                        User = log.UserId.HasValue ?
                            new ViewModels.Users.GetUserResponseModel
                            {
                                Id = log.User.Id,
                                Username = log.User.UserName,
                                FirstName = log.User.FirstName,
                                LastName = log.User.LastName,
                                Patronymic = log.User.Patronymic,
                                Position = log.User.Position,
                                Rank = log.User.Rank,
                                RegionId = log.User.Regions.First().Id,
                                Region = log.User.Regions.First().Name,
                                Role = (await _userManager.GetRolesAsync(log.User)).FirstOrDefault(),
                                IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(log.User),
                                IsLockedOut = await _userManager.IsLockedOutAsync(log.User),
                                IsEnabled = log.User.IsEnabled
                            }
                        : null
                    }
                );
            }
            return Ok(new ViewModels.Logs.GetLogsResponseModel()
            {
                Count = count,
                Page = page,
                Amount = amount,
                Logs = logs.ToArray()
            });
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetLog([FromRoute] string id)
        {
            Log log = await _context.Logs.Include(l => l.Region).Include(l => l.Subject).ThenInclude(s => s.Regions).Include(l => l.User).ThenInclude(u => u.Regions).OrderByDescending(l => l.LoggedAt).FirstOrDefaultAsync(l => l.Id == id);
            if (log is not null)
            {
                ViewModels.Logs.GetLogResponseModel logView = new ViewModels.Logs.GetLogResponseModel
                {
                    Id = log.Id,
                    Action = log.Action,
                    LoggedAt = log.LoggedAt,
                    SubjectId = log.SubjectId,
                    Subject = new ViewModels.Users.GetUserResponseModel
                    {
                        Id = log.Subject.Id,
                        Username = log.Subject.UserName,
                        FirstName = log.Subject.FirstName,
                        LastName = log.Subject.LastName,
                        Patronymic = log.Subject.Patronymic,
                        Position = log.Subject.Position,
                        Rank = log.Subject.Rank,
                        RegionId = log.Subject.Regions.First().Id,
                        Region = log.Subject.Regions.First().Name,
                        Role = (await _userManager.GetRolesAsync(log.Subject)).FirstOrDefault(),
                        IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(log.Subject),
                        IsLockedOut = await _userManager.IsLockedOutAsync(log.Subject),
                        IsEnabled = log.Subject.IsEnabled
                    },
                    RegionId = log.RegionId,
                    Region = log.RegionId.HasValue ? new ViewModels.Regions.GetRegionResponseModel
                    {
                        Id = log.Region.Id,
                        Name = log.Region.Name,
                        IsArchived = log.Region.IsArchived
                    } : null,
                    RoleId = log.RoleId,
                    Role = log.RoleId.HasValue ? log.Role : null,
                    UserId = log.UserId,
                    User = log.UserId.HasValue ?
                            new ViewModels.Users.GetUserResponseModel
                            {
                                Id = log.User.Id,
                                Username = log.User.UserName,
                                FirstName = log.User.FirstName,
                                LastName = log.User.LastName,
                                Patronymic = log.User.Patronymic,
                                Position = log.User.Position,
                                Rank = log.User.Rank,
                                RegionId = log.User.Regions.First().Id,
                                Region = log.User.Regions.First().Name,
                                Role = (await _userManager.GetRolesAsync(log.User)).FirstOrDefault(),
                                IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(log.User),
                                IsLockedOut = await _userManager.IsLockedOutAsync(log.User),
                                IsEnabled = log.User.IsEnabled
                            }
                        : null
                };
                return Ok(logView);
            }
            return NotFound(new ViewModels.Logs.GetLogResponseModel { Id = id });
        }

        [Route("filter")]
        [HttpPost]
        public async Task<IActionResult> FilterLogs([FromBody] ViewModels.Logs.FilterLogsRequestModel model, [FromQuery] int page = 1, [FromQuery] int amount = -1)
        {
            List<ViewModels.Logs.GetLogResponseModel> logs = new List<ViewModels.Logs.GetLogResponseModel>();
            List<Log> logsEntities = await _context.Logs.Include(l => l.Region).Include(l => l.Subject).ThenInclude(s => s.Regions).Include(l => l.User).ThenInclude(u => u.Regions).OrderByDescending(l => l.LoggedAt).ToListAsync();

            List<Log> prepared = new List<Log>();
            List<Log> filteredBySubject = new List<Log>();
            foreach (var user in model.Subjects)
            {
                filteredBySubject.AddRange(logsEntities.Where(l => l.Subject.UserName == user));
            }
            List<Log> filteredByUsers = new List<Log>();
            foreach (var user in model.Users)
            {
                foreach(var log in logsEntities)
                {
                    if(log.UserId.HasValue)
                    {
                        if(log.User.UserName == user)
                        {
                            filteredByUsers.Add(log);
                        }
                    }
                }
            }
            List<Log> filteredByRegion = new List<Log>();
            foreach (var region in model.Regions)
            {
                foreach (var log in logsEntities)
                {
                    if (log.RegionId.HasValue)
                    {
                        if (log.Region.Name == region)
                        {
                            filteredByRegion.Add(log);
                        }
                    }
                }
            }
            List<Log> filteredByRole = new List<Log>();
            foreach (var role in model.Roles)
            {
                foreach (var log in logsEntities)
                {
                    if (log.RoleId.HasValue)
                    {
                        if (log.Role == role)
                        {
                            filteredByRole.Add(log);
                        }
                    }
                }
            }
            List<Log> filteredByAction = new List<Log>();
            foreach (var action in model.Actions)
            {
                filteredByAction.AddRange(logsEntities.Where(l => l.Action == action));
            }
            List<Log> filteredByDate = new List<Log>();
            if(model.Start.HasValue && model.End.HasValue)
            {
                filteredByDate = logsEntities.Where(l => l.LoggedAt >= model.Start.Value && l.LoggedAt <= model.End.Value).ToList();
            }
            else if(model.Start.HasValue && !model.End.HasValue)
            {
                filteredByDate = logsEntities.Where(l => l.LoggedAt >= model.Start.Value).ToList();
            }
            else if(!model.Start.HasValue && model.End.HasValue)
            {
                filteredByDate = logsEntities.Where(l => l.LoggedAt <= model.End.Value).ToList();
            }

            var filtered = new List<List<Log>>() { filteredBySubject, filteredByUsers, filteredByRegion, filteredByRole, filteredByAction, filteredByDate };
            prepared = IntersectNonEmpty(filtered).ToList();

            var filters = new List<List<string>>() { model.Subjects.ToList(), model.Users.ToList(), model.Regions.ToList(), model.Roles.ToList() };
            if (filters.Any(f => f.Count > 0) || model.Actions.Length > 0 || model.Start.HasValue || model.End.HasValue)
            {
                logsEntities = prepared.OrderByDescending(l => l.LoggedAt).ToList();
            }

            var count = logsEntities.LongCount();
            if (amount > 0)
            {
                logsEntities = logsEntities.Skip((page - 1) * amount).Take(amount).ToList();
            }

            foreach (var log in logsEntities)
            {
                logs.Add
                (
                    new ViewModels.Logs.GetLogResponseModel
                    {
                        Id = log.Id,
                        Action = log.Action,
                        LoggedAt = log.LoggedAt,
                        SubjectId = log.SubjectId,
                        Subject = new ViewModels.Users.GetUserResponseModel
                        {
                            Id = log.Subject.Id,
                            Username = log.Subject.UserName,
                            FirstName = log.Subject.FirstName,
                            LastName = log.Subject.LastName,
                            Patronymic = log.Subject.Patronymic,
                            Position = log.Subject.Position,
                            Rank = log.Subject.Rank,
                            RegionId = log.Subject.Regions.First().Id,
                            Region = log.Subject.Regions.First().Name,
                            Role = (await _userManager.GetRolesAsync(log.Subject)).FirstOrDefault(),
                            IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(log.Subject),
                            IsLockedOut = await _userManager.IsLockedOutAsync(log.Subject),
                            IsEnabled = log.Subject.IsEnabled
                        },
                        RegionId = log.RegionId,
                        Region = log.RegionId.HasValue ? new ViewModels.Regions.GetRegionResponseModel
                        {
                            Id = log.Region.Id,
                            Name = log.Region.Name,
                            IsArchived = log.Region.IsArchived
                        } : null,
                        RoleId = log.RoleId,
                        Role = log.RoleId.HasValue ? log.Role : null,
                        UserId = log.UserId,
                        User = log.UserId.HasValue ?
                            new ViewModels.Users.GetUserResponseModel
                            {
                                Id = log.User.Id,
                                Username = log.User.UserName,
                                FirstName = log.User.FirstName,
                                LastName = log.User.LastName,
                                Patronymic = log.User.Patronymic,
                                Position = log.User.Position,
                                Rank = log.User.Rank,
                                RegionId = log.User.Regions.First().Id,
                                Region = log.User.Regions.First().Name,
                                Role = (await _userManager.GetRolesAsync(log.User)).FirstOrDefault(),
                                IsTOTPEnabled = await _userManager.GetTwoFactorEnabledAsync(log.User),
                                IsLockedOut = await _userManager.IsLockedOutAsync(log.User),
                                IsEnabled = log.User.IsEnabled
                            }
                        : null
                    }
                );
            }
            return Ok(new ViewModels.Logs.GetLogsResponseModel()
            {
                Count = count,
                Page = page,
                Amount = amount,
                Logs = logs.OrderByDescending(l => l.LoggedAt).ToArray()
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
