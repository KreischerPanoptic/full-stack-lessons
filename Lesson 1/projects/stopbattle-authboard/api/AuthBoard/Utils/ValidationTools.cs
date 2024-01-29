using AuthBoard.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AuthBoard.Utils
{
    public class ValidationTools
    {
        private readonly IServiceScopeFactory scopeFactory;

        public ValidationTools(IServiceScopeFactory scopeFactory)
        {
            this.scopeFactory = scopeFactory;
        }

        #region Users
        public async Task<bool> IsUserExists(long id)
        {
            using (var scope = scopeFactory.CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                if (await _context.Users.FirstOrDefaultAsync(u => u.Id == id) is not null)
                {
                    return true;
                }
                return false;
            }
        }

        public bool IsPasswordStrong(string password)
        {
            var result = Zxcvbn.Core.EvaluatePassword(password);
            if (result.Score >= 2)
            {
                return true;
            }
            return false;
        }

        public bool IsPasswordSatisfyPolicy(string password)
        {
            return (password.Any(char.IsDigit) && password.Any(char.IsUpper) && password.Any(char.IsLower) && (password.Any(char.IsSymbol) || password.Any(char.IsPunctuation))) && password.Length >= 8;
        }

        public async Task<bool> IsUsernameUnique(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return false;
            }
            using (var scope = scopeFactory.CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
                if (user is null)
                {
                    return true;
                }
                return false;
            }
        }

        public async Task<bool> IsRespectiveUsernameUnique(string username, long id)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return false;
            }
            using (var scope = scopeFactory.CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
                if (user is null)
                {
                    return true;
                }
                return user.Id == id;
            }
        }
        #endregion Users

        #region Regions
        public async Task<bool> IsActiveRegionExists(long regionId)
        {
            if (regionId < 1)
            {
                return false;
            }
            using (var scope = scopeFactory.CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var region = await _context.Regions.FirstOrDefaultAsync(r => r.Id == regionId && !r.IsArchived);
                if (region is not null)
                {
                    return true;
                }
                return false;
            }
        }

        public async Task<bool> IsRegionExists(long regionId)
        {
            if (regionId < 1)
            {
                return false;
            }
            using (var scope = scopeFactory.CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var region = await _context.Regions.FirstOrDefaultAsync(r => r.Id == regionId);
                if (region is not null)
                {
                    return true;
                }
                return false;
            }
        }

        public async Task<bool> IsNullableRegionExists(long? regionId)
        {
            if (regionId < 1 || !regionId.HasValue)
            {
                return false;
            }
            using (var scope = scopeFactory.CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var region = await _context.Regions.FirstOrDefaultAsync(r => r.Id == regionId);
                if (region is not null)
                {
                    return true;
                }
                return false;
            }
        }

        public async Task<bool> IsActiveNullableRegionExists(long? regionId)
        {
            if (regionId < 1 || !regionId.HasValue)
            {
                return false;
            }
            using (var scope = scopeFactory.CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var region = await _context.Regions.FirstOrDefaultAsync(r => r.Id == regionId && !r.IsArchived);
                if (region is not null)
                {
                    return true;
                }
                return false;
            }
        }
        #endregion Regions
    }
}
