using CarShop.WebAPI.Models.Security.Roles;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Services
{
    public interface IRolesService
    {
        IQueryable<RoleListModel> GetAllRoles(int startRow, int endRow);
        Task<byte[]> ExportAllRolesToCSV();
        Task<byte[]> ExportAllRolesToXLSX();

        Task<string> GetRoleDisplayNameAsync(int roleId);

        Task DeleteRolesAsync(int[] roleIds);
    }
}