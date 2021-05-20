namespace CarShop.WebAPI.Models.Security.Authentication
{
    public class RefreshTokenRequestModel
    {
        public string Username { get; set; }

        public string RefreshToken { get; set; }
    }
}