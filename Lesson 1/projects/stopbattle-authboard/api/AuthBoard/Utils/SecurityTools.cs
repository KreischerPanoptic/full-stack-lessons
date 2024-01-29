using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace AuthBoard.Utils
{
    public static class SecurityTools
    {
        public static string GetRandomString(int length) 
        {
            var randomNumber = new byte[4096];
            using (var randomNumberGenerator = RandomNumberGenerator.Create())
            {
                randomNumberGenerator.GetBytes(randomNumber);
                return new string(Convert.ToBase64String(randomNumber).Take(length).ToArray());
            }
        }
    }
}
