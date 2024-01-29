using AuthBoard.Data;
using AuthBoard.Models;
using AuthBoard.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.Controllers
{
    [Authorize]
    [Route("api/regions")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly ValidationTools _tools;

        public RegionsController(ApplicationDbContext context, ILogger<UsersController> logger, ValidationTools tools)
        {
            _context = context;
            _logger = logger;
            _tools = tools;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetRegions([FromQuery] bool active = true, [FromQuery] bool archived = false, [FromQuery] int page = 1, [FromQuery] int amount = -1)
        {
            List<ViewModels.Regions.GetRegionResponseModel> regions = new List<ViewModels.Regions.GetRegionResponseModel>();
            List<Region> regionEntities = new List<Region>();
            if (active && !archived)
            {
                regionEntities = await _context.Regions.Include(r => r.Users).Where(r => !r.IsArchived).ToListAsync();
            }
            else if (!active && archived)
            {
                regionEntities = await _context.Regions.Include(r => r.Users).Where(r => r.IsArchived).ToListAsync();
            }
            else if (active && archived)
            {
                regionEntities = await _context.Regions.Include(r => r.Users).ToListAsync();
            }

            var count = regionEntities.LongCount();
            if (amount > 0)
            {
                regionEntities = regionEntities.Skip((page - 1) * amount).Take(amount).ToList();
            }

            foreach (var region in regionEntities)
            {
                if (region.Id != 1)
                {
                    regions.Add
                    (
                        new ViewModels.Regions.GetRegionResponseModel
                        {
                            Id = region.Id,
                            Name = region.Name,
                            UsersCount = region.Users.Where(u => u.IsEnabled).LongCount(),
                            IsArchived = region.IsArchived
                        }
                    );
                }
            }
            return Ok(new ViewModels.Regions.GetRegionsResponseModel() {
                Count = count,
                Page = page,
                Amount = amount,
                Regions = regions.ToArray()
            });
        }

        [Route("{id:long:min(1)}")]
        [HttpGet]
        public async Task<IActionResult> GetRegion([FromRoute] long id)
        {
            Region region = await _context.Regions.Include(r => r.Users).FirstOrDefaultAsync(r => r.Id == id);

            if (region is not null)
            {
                ViewModels.Regions.GetRegionResponseModel regionView = new ViewModels.Regions.GetRegionResponseModel
                {
                    Id = region.Id,
                    Name = region.Name,
                    UsersCount= region.Users.Where(u => u.IsEnabled).LongCount(),
                    IsArchived = region.IsArchived
                };
                return Ok(regionView);
            }
            return NotFound(new ViewModels.Regions.GetRegionResponseModel { Id = id });
        }

        [Authorize(Roles = "admin")]
        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> CreateRegion([FromBody] ViewModels.Regions.CreateRegionUpdateRequestModel createRegion)
        {
            Region region = new Region
            {
                Name = createRegion.Name,
                IsArchived = false
            };

            var role = await _context.Roles.FirstAsync(r => r.Name == "admin");
            if(role is null)
            {
                return StatusCode(500, new ViewModels.Regions.CreateRegionResponseModel { IsCreated = false, Error = "У системі не знайдено ролі з правами адміна. Це свідчить про руйнівний збій у системі. Будь ласка, повідомте про це розробника" });
            }


            await _context.Regions.AddAsync(region);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return StatusCode(500, new ViewModels.Regions.CreateRegionResponseModel { IsCreated = false, Error = "Під час збереження контексту до бази данних - сталася помилка" });
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
                    RegionId = region.Id,
                };

                await _context.Logs.AddAsync(log);
                await _context.SaveChangesAsync();
            }

            return Ok(new ViewModels.Regions.CreateRegionResponseModel
            {
                IsCreated = true,
                Region = new ViewModels.Regions.GetRegionResponseModel
                {
                    Id = region.Id,
                    Name = region.Name,
                    UsersCount = 0,
                    IsArchived = region.IsArchived
                }
            });
        }

        [Authorize(Roles = "admin")]
        [Route("update/{id:long:min(1)}")]
        [HttpPatch]
        public async Task<IActionResult> UpdateRegion([FromRoute] long id, [FromBody] ViewModels.Regions.CreateRegionUpdateRequestModel updateRegion)
        {
            if(!await _tools.IsActiveRegionExists(id) || id == 1)
            {
                return NotFound(new ViewModels.Regions.UpdateRegionResponseModel
                {
                    IsUpdated = false,
                    Error = $"Активного регіону з ID: {id} - не знайдено",
                    Region = new ViewModels.Regions.GetRegionResponseModel
                    {
                        Id = id
                    }
                });
            }

            Region region = await _context.Regions.Include(r => r.Users).FirstAsync(r => r.Id == id);
            if (!string.IsNullOrWhiteSpace(updateRegion.Name) && updateRegion.Name != region.Name)
            {
                region.Name = updateRegion.Name;
            }

            _context.Regions.Update(region);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return StatusCode(500, new ViewModels.Regions.UpdateRegionResponseModel { IsUpdated = false, Error = "Під час збереження контексту до бази данних - сталася помилка",
                    Region = new ViewModels.Regions.GetRegionResponseModel
                    {
                        Id = id
                    }
                });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
            if (user is not null)
            {

                TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                Log log = new Log
                {
                    SubjectId = user.Id,
                    Action = Models.Action.Update,
                    LoggedAt = time,
                    RegionId = region.Id,
                };

                await _context.Logs.AddAsync(log);
                await _context.SaveChangesAsync();
            }

            return Ok(new ViewModels.Regions.UpdateRegionResponseModel
            {
                IsUpdated = true,
                Region = new ViewModels.Regions.GetRegionResponseModel
                {
                    Id = region.Id,
                    Name = region.Name,
                    UsersCount = region.Users.Where(u => u.IsEnabled).LongCount(),
                    IsArchived = region.IsArchived
                }
            });
        }

        [Authorize(Roles = "admin")]
        [Route("remove/{id:long:min(1)}")]
        [HttpDelete]
        public async Task<IActionResult> RemoveRegion([FromRoute] long id)
        {
            if (!await _tools.IsActiveRegionExists(id) || id == 1)
            {
                return NotFound(new ViewModels.Regions.DeleteRegionResponseModel
                {
                    IsDeleted = false,
                    Error = $"Активного регіону з ID: {id} - не знайдено",
                    Region = new ViewModels.Regions.GetRegionResponseModel
                    {
                        Id = id
                    }
                });
            }

            var region = await _context.Regions.FirstAsync(r => r.Id == id);
            region.IsArchived = true;
            _context.Regions.Update(region);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return StatusCode(500, new ViewModels.Regions.DeleteRegionResponseModel { IsDeleted = false, Error = "Під час збереження контексту до бази данних - сталася помилка",
                    Region = new ViewModels.Regions.GetRegionResponseModel
                    {
                        Id = id
                    }
                });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
            if (user is not null)
            {

                TimeZoneInfo zone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
                DateTime time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone);

                Log log = new Log
                {
                    SubjectId = user.Id,
                    Action = Models.Action.Delete,
                    LoggedAt = time,
                    RegionId = region.Id,
                };

                await _context.Logs.AddAsync(log);
                await _context.SaveChangesAsync();
            }

            return Ok(new ViewModels.Regions.DeleteRegionResponseModel
            {
                IsDeleted = true,
                Region = new ViewModels.Regions.GetRegionResponseModel
                {
                    Id = id
                }
            });
        }
    }
}
