using CarShop.Core.BusinessEntities.Security;
using CarShop.Core.Helper;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories
{
    public interface IRolesRepository
    {
        IQueryable<Roles> GetAll(QueryParameters parameters = null);
        IQueryable<Roles> GetAll(int startRow, int endRow, QueryParameters parameters = null);
        Task<string> GetDisplayNameAsync(int roleId);

        Task DeleteAsync(int[] roleIds);
        Task UpdateAsync(Roles role);
        Task InsertAsync(Roles role);

        Task<Roles> GetAsync(int roleId);
    }
}