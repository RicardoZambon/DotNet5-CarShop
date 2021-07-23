using CarShop.Core.BusinessEntities.Security;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories
{
    public interface IRolesRepository
    {
        IQueryable<Roles> GetAll();
        IQueryable<Roles> GetAll(int startRow, int endRow);

        Task<string> GetDisplayNameAsync(int roleId);

        Task DeleteAsync(int[] roleIds);
    }
}