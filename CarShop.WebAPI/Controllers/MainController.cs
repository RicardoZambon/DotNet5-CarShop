using CarShop.WebAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Controllers
{
    [ApiController, Route("[controller]")]
    public class MainController : ControllerBase
    {
        private readonly IMenuService menuService;

        public MainController(IMenuService menuService)
        {
            this.menuService = menuService;
        }


        [HttpGet, Route("[action]")]
        public IActionResult GetMenus()
        {
            try
            {
                return Ok(menuService.GetAllMenus());
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}