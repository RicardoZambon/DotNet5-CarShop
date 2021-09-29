using CarShop.Core.BusinessEntities.Audit;
using CarShop.Core.BusinessEntities.Base;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories.EFCore
{
    public class ServiceAuditHistoryRepository : IServiceAuditHistoryRepository
    {
        private readonly CarShopDbContext context;

        public ServiceAuditHistoryRepository(CarShopDbContext context)
        {
            this.context = context;
        }


        public IQueryable<ServiceAuditHistory> GetAllServices<TEntity>(int entityID) where TEntity : BaseEntity
        {
            return context.Set<ServiceAuditHistory>().Where(x => x.Operations.Any(x => x.EntityName == typeof(TEntity).Name && x.EntityID == entityID));
        }
        public async Task<IQueryable<OperationAuditHistory>> GetAllOperationsAsync(int serviceId)
        {
            var service = await context.FindAsync<ServiceAuditHistory>(serviceId);

            return service.Operations.AsQueryable();
        }


        public async Task InsertAsync(ServiceAuditHistory serviceAuditHistory)
        {
            await Task.Run(() =>
            {
                context.Set<ServiceAuditHistory>().Add(serviceAuditHistory);
            });
        }
    }
}