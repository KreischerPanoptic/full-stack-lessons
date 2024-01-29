using AuthBoard.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.Controllers
{
    [Authorize]
    [Route("api/autocomplete")]
    [ApiController]
    public class AutocompleteController : ControllerBase
    {
        private readonly ILogger<AutocompleteController> _logger;
        private readonly ApplicationDbContext _context;

        public AutocompleteController(ApplicationDbContext context, ILogger<AutocompleteController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [Route("username/{query}")]
        [HttpGet]
        public async Task<IActionResult> GetUsernameHints([FromRoute] string query)
        {
            var userEntities = await _context.Users.Where(u => u.UserName.ToLowerInvariant().StartsWith(query.ToLowerInvariant())).ToListAsync();
            List<string> usernames = new List<string>();
            foreach (var user in userEntities)
            {
                usernames.Add(user.UserName);
            }

            return Ok(new ViewModels.Autocomplete.GetHintsResponseModel
            {
                Count = usernames.Count,
                Hints = usernames.ToArray()
            });
        }

        [Route("lastname/{query}")]
        [HttpGet]
        public async Task<IActionResult> GetLastNameHints([FromRoute] string query)
        {
            var userEntities = await _context.Users.Where(u => u.LastName.ToLowerInvariant().StartsWith(query.ToLowerInvariant())).ToListAsync();
            List<string> usernames = new List<string>();
            foreach (var user in userEntities)
            {
                usernames.Add(user.LastName);
            }

            return Ok(new ViewModels.Autocomplete.GetHintsResponseModel
            {
                Count = usernames.Count,
                Hints = usernames.ToArray()
            });
        }

        [Route("firstname/{query}")]
        [HttpGet]
        public async Task<IActionResult> GetFirstNameHints([FromRoute] string query)
        {
            var userEntities = await _context.Users.Where(u => u.FirstName.ToLowerInvariant().StartsWith(query.ToLowerInvariant())).ToListAsync();
            List<string> usernames = new List<string>();
            foreach (var user in userEntities)
            {
                usernames.Add(user.FirstName);
            }

            return Ok(new ViewModels.Autocomplete.GetHintsResponseModel
            {
                Count = usernames.Count,
                Hints = usernames.ToArray()
            });
        }

        [Route("region/{query}")]
        [HttpGet]
        public async Task<IActionResult> GetRegionHints([FromRoute] string query)
        {
            var userEntities = await _context.Regions.Where(r => r.Name.ToLowerInvariant().StartsWith(query.ToLowerInvariant())).ToListAsync();
            List<string> usernames = new List<string>();
            foreach (var user in userEntities)
            {
                usernames.Add(user.Name);
            }

            return Ok(new ViewModels.Autocomplete.GetHintsResponseModel
            {
                Count = usernames.Count,
                Hints = usernames.ToArray()
            });
        }

        [Route("role/{query}")]
        [HttpGet]
        public async Task<IActionResult> GetRoleHints([FromRoute] string query)
        {
            var userEntities = await _context.Roles.Where(r => r.Name.ToLowerInvariant().StartsWith(query.ToLowerInvariant())).ToListAsync();
            List<string> usernames = new List<string>();
            foreach (var user in userEntities)
            {
                usernames.Add(user.Name);
            }

            return Ok(new ViewModels.Autocomplete.GetHintsResponseModel
            {
                Count = usernames.Count,
                Hints = usernames.ToArray()
            });
        }
    }
}
