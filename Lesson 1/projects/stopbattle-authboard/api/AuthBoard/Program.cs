using AuthBoard.Data;
using AuthBoard.Models;
using AuthBoard.Utils;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBoard
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                try
                {
                    var userManager = services.GetRequiredService<UserManager<User>>();
                    var rolesManager = services.GetRequiredService<RoleManager<Role>>();
                    var context = services.GetRequiredService<ApplicationDbContext>();

                    if (!await IdentityInitializerTool.IsRolesExists(rolesManager))
                    {
                        await IdentityInitializerTool.InitializeRolesAsync(rolesManager);
                    }
                    if (!await IdentityInitializerTool.IsAdminUserExists(userManager))
                    {
                        var result = await IdentityInitializerTool.CreateAdminUser(context, userManager);
                        logger.LogWarning("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n");
                        logger.LogWarning("Created admin user with username {0} and password {1}\nTOTP Manual Code: {2}\nQR Code URL: {3}", "admin", result.Item1, result.Item2, result.Item3);
                        logger.LogWarning("\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n");
                    }

                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
