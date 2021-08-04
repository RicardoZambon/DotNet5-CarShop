using CarShop.Core.Helper;
using CarShop.WebAPI.Models.Security.Roles;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Services
{
    public interface IRolesService
    {
        IQueryable<RoleListModel> GetAllRoles(int startRow, int endRow, QueryParameters parameters = null);
        Task<byte[]> ExportAllRolesToCSV(QueryParameters parameters = null);
        Task<byte[]> ExportAllRolesToXLSX(QueryParameters parameters = null);
        Task<string> GetRoleDisplayNameAsync(int roleId);

        Task DeleteRolesAsync(int[] roleIds);
        Task<RoleEditResponse> UpdateRoleAsync(int roleId, RoleEditModel roleModel);
        Task<RoleEditResponse> InsertRoleAsync(RoleEditModel roleModel);

        Task<RoleEditModel> GetRoleAsync(int roleId);
    }
}