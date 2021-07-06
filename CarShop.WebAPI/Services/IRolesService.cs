using CarShop.WebAPI.Models.Security.Roles;
using System.Linq;

namespace CarShop.WebAPI.Services
{
    public interface IRolesService
    {
        IQueryable<RoleListModel> GetAllRoles(int startRow, int endRow);
    }
}