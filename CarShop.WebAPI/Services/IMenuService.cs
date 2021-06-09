using CarShop.WebAPI.Models.Security.Menus;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Services
{
    public interface IMenuService
    {
        IQueryable<MenuResponse> GetAllMenus();
    }
}