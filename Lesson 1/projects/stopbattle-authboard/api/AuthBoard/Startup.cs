using AuthBoard.Data;
using AuthBoard.Models;
using AuthBoard.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace AuthBoard
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string stopbattleCORS = "_stopbattleCORS";

        public void ConfigureServices(IServiceCollection services)
        {
            string connection = "";

            var dbHost = Environment.GetEnvironmentVariable("MysqlHost").Trim('"');
            var dbPort = int.Parse(Environment.GetEnvironmentVariable("MysqlPort").Trim('"'));
            var dbUser = Environment.GetEnvironmentVariable("MysqlUser").Trim('"');
            var dbPassword = Environment.GetEnvironmentVariable("MysqlPassword").Trim('"');
            var dbName = Environment.GetEnvironmentVariable("MysqlDatabase").Trim('"');

            connection = $"Server={dbHost};Port={dbPort};Database={dbName};User={dbUser};Password={dbPassword};TreatTinyAsBoolean=true;CharSet=utf8";

            using var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.SetMinimumLevel(LogLevel.Information);
                builder.AddConsole();
                builder.AddEventSourceLogger();
            });
            var logger = loggerFactory.CreateLogger("Startup");

            using (var cnnt = new MySql.Data.MySqlClient.MySqlConnection(connection))
            {
                Stopwatch stopwatch = new Stopwatch();
                stopwatch.Start();
                while (stopwatch.Elapsed.Minutes < 10 && !IsDBRunning(cnnt))
                {
                    logger.LogWarning($"DB service non responsive!");
                    logger.LogInformation("Retrying in 5 seconds...");
                    Thread.Sleep(5000);
                }
                stopwatch.Stop();
                if (!IsDBRunning(cnnt))
                {
                    logger.LogCritical("DB connection attempt - unsuccessful! Rebooting app!");
                    Environment.Exit(1);
                }
            }
            services.AddDbContext<ApplicationDbContext>(options =>
                        options.UseMySql(connection, ServerVersion.AutoDetect(connection)));
            logger.LogInformation("Connection to DB established! App ready.");

            services.AddSingleton<ValidationTools>();

            services.AddIdentity<User, Role>(options =>
            {
                options.Lockout.MaxFailedAccessAttempts = int.MaxValue;
                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromHours(3);
                options.User.RequireUniqueEmail = false;
                options.Password.RequiredLength = 8;
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedAccount = false;

            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    RequireExpirationTime = true,
                    IssuerSigningKey = JWTOptions.GetSymmetricSecurityKey(),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    RequireSignedTokens = true,
                    ValidateLifetime = true,
                    ValidIssuer = JWTOptions.JWTIssuer,
                    ValidAudience = JWTOptions.JWTSubscriber,
                    LifetimeValidator = (DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters) =>
                    {
                        return expires != null && expires > DateTime.UtcNow && notBefore != null && notBefore < DateTime.UtcNow;
                    },
                    ClockSkew = TimeSpan.Zero,
                    SaveSigninToken = true,
                    IssuerValidator = (string issuer, SecurityToken securityToken, TokenValidationParameters validationParameters) => { return issuer == JWTOptions.JWTIssuer ? issuer : null; },
                    AudienceValidator = (IEnumerable<string> audiences, SecurityToken securityToken, TokenValidationParameters validationParameters) =>
                    {
                        if (audiences.Count() == 1)
                        {
                            if (audiences.Contains(JWTOptions.JWTSubscriber))
                            {
                                return true;
                            }
                        }
                        return false;
                    }
                };
            });

            services.AddCors(options =>
            {
                options.AddPolicy(name: stopbattleCORS,
                    builder =>
                    {
                        builder.AllowAnyHeader();
                        builder.WithOrigins(new string[] {
                            "http://stopbattle.org",
                            "http://volunteer.stopbattle.org",
                            "http://auth.stopbattle.org",
                            "http://backend.stopbattle.org",
                            "http://localhost:8000",
                            "https://stopbattle.org",
                            "https://volunteer.stopbattle.org",
                            "https://auth.stopbattle.org",
                            "https://backend.stopbattle.org",
                            "https://localhost:8000",
                        });
                        builder.AllowCredentials();
                        builder.AllowAnyMethod();
                    });
            });

            services.AddControllers().AddJsonOptions(options =>
            {
                var enumConverter = new JsonStringEnumConverter();
                options.JsonSerializerOptions.Converters.Add(enumConverter);
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(stopbattleCORS);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        #region Tools
        private bool IsDBRunning(MySql.Data.MySqlClient.MySqlConnection connection)
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                connection.Close();
            }
        }
        #endregion Tools
    }
}
