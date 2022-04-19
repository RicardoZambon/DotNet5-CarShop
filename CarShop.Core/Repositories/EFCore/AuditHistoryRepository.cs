using CarShop.Core.BusinessEntities.Audit;
using CarShop.Core.BusinessEntities.Base;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories.EFCore
{
    public class AuditHistoryRepository : IAuditHistoryRepository
    {
        private readonly CarShopDbContext context;

        public AuditHistoryRepository(CarShopDbContext context)
        {
            this.context = context;
        }


        public IQueryable<ServiceAuditHistory> GetAllServices<TEntity>(int entityID) where TEntity : BaseEntity
        {
            return context.Set<ServiceAuditHistory>().Where(x => x.Operations.Any(x => x.EntityName == typeof(TEntity).Name && x.EntityID == entityID));
        }
        public async Task<IQueryable<OperationAuditHistory>> GetAllOperationsAsync(int serviceId)
        {
            return (await context.FindAsync<ServiceAuditHistory>(serviceId)).Operations.AsQueryable();
        }

        public async Task<OperationAuditHistory> GetOperationAsync(int operationId)
        {
            return await context.FindAsync<OperationAuditHistory>(operationId);
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