using AuthBoard.Data;
using AuthBoard.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard.Controllers
{
    [Authorize]
    [Route("api/validate")]
    [ApiController]
    public class ValidationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ValidationTools _tools;

        public ValidationController(ApplicationDbContext context, ValidationTools tools)
        {
            _context = context;
            _tools = tools;
        }

        #region Users
        [Route("users/exists/{id:long:min(1)}")]
        [HttpGet]
        public async Task<IActionResult> IsUserExists([FromRoute] long id)
        {
            return Ok(new ViewModels.Validation.ValidationResponseModel
            {
                IsPassed = await _tools.IsUserExists(id)
            });
        }

        [Route("users/password/is_strong")]
        [HttpPost]
        public async Task<IActionResult> IsPasswordStrong([FromBody] ViewModels.Validation.ValidationPasswordRequestModel model)
        {
            bool tmpFunction(string password)
            {
                return _tools.IsPasswordStrong(password);
            }

            return Ok(new ViewModels.Validation.ValidationResponseModel
            {
                IsPassed = await Task.Factory.StartNew<bool>(() =>
                {
                    return tmpFunction(model.Password);
                })
            });
        }

        [Route("users/password/is_passing")]
        [HttpPost]
        public IActionResult IsPasswordSatisfyPolicy([FromBody] ViewModels.Validation.ValidationPasswordRequestModel model)
        {
            return Ok(new ViewModels.Validation.ValidationResponseModel
            {
                IsPassed = _tools.IsPasswordSatisfyPolicy(model.Password)
            });
        }

        [Route("users/unique/username")]
        [HttpPost]
        public async Task<IActionResult> IsUsernameUnique([FromBody] ViewModels.Validation.ValidationUsernameRequestModel model)
        {
            return Ok(new ViewModels.Validation.ValidationResponseModel
            {
                IsPassed = await _tools.IsUsernameUnique(model.Username)
            });
        }

        [Route("users/respective/unique/username")]
        [HttpPost]
        public async Task<IActionResult> IsRespectiveUsernameUnique([FromBody] ViewModels.Validation.ValidationRespectiveUsernameRequestModel model)
        {
            return Ok(new ViewModels.Validation.ValidationResponseModel
            {
                IsPassed = await _tools.IsRespectiveUsernameUnique(model.Username, model.Id)
            });
        }
        #endregion Users

        #region Regions
        [Route("regions/exists/{id:long:min(1)}")]
        [HttpGet]
        public async Task<IActionResult> IsRegionExists([FromRoute] long id, [FromQuery] bool active)
        {
            if(active)
            {
                return Ok(new ViewModels.Validation.ValidationResponseModel
                {
                    IsPassed = await _tools.IsActiveRegionExists(id)
                });
            }
            return Ok(new ViewModels.Validation.ValidationResponseModel
            {
                IsPassed = await _tools.IsRegionExists(id)
            });
        }
        #endregion Regions
    }
}
