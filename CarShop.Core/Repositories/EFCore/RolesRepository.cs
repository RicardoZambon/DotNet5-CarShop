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

        public IQueryable<Roles> GetAll()
            => context.Set<Roles>()
                .AsQueryable();

        public IQueryable<Roles> GetAll(int startRow, int endRow)
            => GetAll()
                .Skip(startRow)
                .Take(endRow);
    }
}