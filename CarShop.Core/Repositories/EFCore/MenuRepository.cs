using CarShop.Core.BusinessEntities.Security;
using System.Linq;

namespace CarShop.Core.Repositories.EFCore
{
    public class MenuRepository : IMenuRepository
    {
        private readonly CarShopDbContext dbContext;

        public MenuRepository(CarShopDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public IQueryable<Menus> GetAll()
        {
            return dbContext.Set<Menus>().AsQueryable();
        }
    }
}