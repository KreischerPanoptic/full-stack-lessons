using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthBoard.Utils
{
    public static class JWTOptions
    {
        static JWTOptions()
        {
            JWTSecret = Environment.GetEnvironmentVariable("JWTSecret").Trim('"');
            JWTAccessTokenLifetimeMinutes = int.Parse(Environment.GetEnvironmentVariable("JWTAccessTokenLifetimeMinutes").Trim('"'));
            JWTRefreshTokenLifetimeDays = int.Parse(Environment.GetEnvironmentVariable("JWTRefreshTokenLifetimeDays").Trim('"'));
            JWTIssuer = Environment.GetEnvironmentVariable("JWTIssuer").Trim('"');
            JWTSubscriber = Environment.GetEnvironmentVariable("JWTSubscriber").Trim('"');
            JWTSessionMaxLifetimeDays = int.Parse(Environment.GetEnvironmentVariable("JWTSessionMaxLifetimeDays").Trim('"'));
        }

        public static string JWTSecret { get; set; }
        public static int JWTAccessTokenLifetimeMinutes { get; set; }
        public static int JWTRefreshTokenLifetimeDays { get; set; }
        public static string JWTIssuer { get; set; }
        public static string JWTSubscriber { get; set; }
        public static int JWTSessionMaxLifetimeDays { get; set; }

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JWTSecret));
        }
    }
}
