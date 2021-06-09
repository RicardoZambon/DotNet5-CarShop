using CarShop.Core.BusinessEntities.Security;
using System.Linq;

namespace CarShop.Core.Repositories
{
    public interface IMenuRepository
    {
        IQueryable<Menus> GetAll();
    }
}