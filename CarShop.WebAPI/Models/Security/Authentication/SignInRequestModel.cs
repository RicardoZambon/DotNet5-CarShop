namespace CarShop.WebAPI.Models.Security.Authentication
{
    public class SignInRequestModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}