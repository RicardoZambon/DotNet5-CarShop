using System;
using System.Text.Json.Serialization;

namespace CarShop.WebAPI.Models.Security.Authentication
{
    public class AuthenticationModel
    {
        public string Username { get; set; }

        //[JsonIgnore]
        public string Token { get; set; }

        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
    }
}