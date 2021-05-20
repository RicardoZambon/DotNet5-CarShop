using CarShop.WebAPI.Models.Security.Authentication;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Services
{
    public interface IAuthenticationService
    {
        Task<AuthenticationModel> SignInAsync(SignInRequestModel model);

        Task<AuthenticationModel> RefreshTokenAsync(RefreshTokenRequestModel model);

        Task SignOutAsync();
    }
}