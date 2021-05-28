using System;
using System.Text.Json.Serialization;

namespace CarShop.WebAPI.Models.Security.Authentication
{
    public class AuthenticationModel
    {
        public string Username { get; set; }

        public string Name { get; set; }
        public string Department { get; set; }
        public string Photo { get; set; }

        //[JsonIgnore]
        public string Token { get; set; }

        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
    }
}