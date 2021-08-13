using CarShop.Core.BusinessEntities.Audit;
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


        public async Task InsertAsync(ServiceAuditHistory serviceAuditHistory)
        {
            await Task.Run(() =>
            {
                context.Set<ServiceAuditHistory>().Add(serviceAuditHistory);
            });
        }
    }
}