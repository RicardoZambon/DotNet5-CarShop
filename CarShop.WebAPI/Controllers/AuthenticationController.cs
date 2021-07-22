using CarShop.WebAPI.Helper.Exceptions.Security;
using CarShop.WebAPI.Models.Security.Authentication;
using CarShop.WebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Controllers
{
    [ApiController, Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }


        [HttpPost, Route("[action]"), AllowAnonymous]
        public async Task<IActionResult> SignIn(SignInRequestModel model)
        {
            try
            {
                return Ok(await authenticationService.SignInAsync(model));
            }
            catch (InvalidAuthenticationException)
            {
                return Unauthorized();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost, Route("[action]"), AllowAnonymous]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequestModel model)
        {
            try
            {
                return Ok(await authenticationService.RefreshTokenAsync(model));
            }
            catch (InvalidRefreshTokenException)
            {
                return Unauthorized();
            }
            catch (RefreshTokenNotFoundException)
            {
                return Unauthorized();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost, Route("[action]")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("AuthCookie");
            return Ok();
        }
    }
}