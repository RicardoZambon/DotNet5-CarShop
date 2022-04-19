using CarShop.Core.BusinessEntities.Audit;
using CarShop.Core.BusinessEntities.Base;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories
{
    public interface IAuditHistoryRepository
    {
        IQueryable<ServiceAuditHistory> GetAllServices<TEntity>(int entityID) where TEntity : BaseEntity;

        Task<IQueryable<OperationAuditHistory>> GetAllOperationsAsync(int serviceId);

        Task<OperationAuditHistory> GetOperationAsync(int operationId);

        Task InsertAsync(ServiceAuditHistory role);
    }
}