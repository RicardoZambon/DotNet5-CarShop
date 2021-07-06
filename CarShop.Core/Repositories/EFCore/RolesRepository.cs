using CarShop.Core.BusinessEntities.Security;
using System.Linq;

namespace CarShop.Core.Repositories.EFCore
{
    public class RolesRepository : IRolesRepository
    {
        private readonly CarShopDbContext context;

        public RolesRepository(CarShopDbContext context)
        {
            this.context = context;
        }

        public IQueryable<Roles> GetAll(int startRow, int endRow)
            => context.Set<Roles>()
                .AsQueryable()
                .Skip(startRow)
                .Take(endRow);
    }
}