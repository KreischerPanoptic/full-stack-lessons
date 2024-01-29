using AuthBoard.Data;
using AuthBoard.Models;
using Google.Authenticator;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AuthBoard.Utils
{
    public class IdentityInitializerTool
    {
        public static async Task<bool> IsRolesExists(RoleManager<Role> roleManager, string[] roles = null)
        {
            if (roles is null)
            {
                roles = new string[] { "admin", "reader", "creator", "volunteer" };
            }

            bool isExists = true;
            foreach (var role in roles)
            {
                if (await roleManager.FindByNameAsync(role) is null)
                {
                    isExists = false;
                }
            }
            return isExists;
        }

        public static async Task InitializeRolesAsync(RoleManager<Role> roleManager, string[] roles = null)
        {
            if(roles is null)
            {
                roles = new string[] { "admin", "reader", "creator", "volunteer" };
            }
            
            foreach(var role in roles)
            {
                if (await roleManager.FindByNameAsync(role) is null)
                {
                    await roleManager.CreateAsync(new Role(role));
                }
            }
        }

        public static async Task<bool> IsAdminUserExists(UserManager<User> userManager, string username = "admin")
        {
            return await userManager.FindByNameAsync(username) is not null;
        }

        public static async Task<Tuple<string, string, string>> CreateAdminUser(ApplicationDbContext context, UserManager<User> userManager, string username = "admin")
        {
            User admin = new User { UserName = username, IsEnabled = true };
            Region defaultRegion = await context.Regions.FirstOrDefaultAsync(r => r.Id == 1);
            
            string password = GeneratePassword();

            IdentityResult result = await userManager.CreateAsync(admin, password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(admin, "admin");
                var key = await userManager.GetAuthenticatorKeyAsync(admin);
                if (string.IsNullOrWhiteSpace(key))
                {
                    await userManager.ResetAuthenticatorKeyAsync(admin);
                    key = await userManager.GetAuthenticatorKeyAsync(admin);
                }
                await userManager.SetTwoFactorEnabledAsync(admin, true);
                TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
                SetupCode setupInfo = tfa.GenerateSetupCode("Stopbattle Authentication Server", admin.UserName.ToString(), key, false, 3);

                if (defaultRegion is not null)
                {
                    admin.Regions.Add(defaultRegion);
                }
                await context.SaveChangesAsync();
                return new Tuple<string,string, string>(password, setupInfo.ManualEntryKey, setupInfo.QrCodeSetupImageUrl);
            }
            return null;
        }

        private static string GeneratePassword(int length = 16)
        {
            const string upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string lower = "abcdefghijklmnopqrstuvwxyz";
            const string digits = "1234567890";
            const string special = @"-_+=`~!@#$%^&*()|\/';:,.?[]{}";
            StringBuilder result = new StringBuilder();
            using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
            {
                byte[] uintBuffer = new byte[sizeof(uint)];
                byte[] uintChooseBuffer = new byte[sizeof(uint)];

                while (length-- > 0)
                {
                    rng.GetBytes(uintBuffer);
                    rng.GetBytes(uintChooseBuffer);
                    uint num = BitConverter.ToUInt32(uintBuffer, 0);
                    uint choose = BitConverter.ToUInt32(uintChooseBuffer, 0);
                    switch (choose % 4)
                    {
                        case 0:
                            result.Append(upper[(int)(num % (uint)upper.Length)]);
                            break;
                        case 1:
                            result.Append(lower[(int)(num % (uint)lower.Length)]);
                            break;
                        case 2:
                            result.Append(digits[(int)(num % (uint)digits.Length)]);
                            break;
                        case 3:
                            result.Append(special[(int)(num % (uint)special.Length)]);
                            break;
                    }
                }
            }

            return result.ToString();
        }
    }
}
