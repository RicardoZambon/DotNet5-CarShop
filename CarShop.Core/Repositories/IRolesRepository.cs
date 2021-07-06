using CarShop.Core.BusinessEntities.Security;
using System.Linq;

namespace CarShop.Core.Repositories
{
    public interface IRolesRepository
    {
        IQueryable<Roles> GetAll(int startRow, int endRow);
    }
}