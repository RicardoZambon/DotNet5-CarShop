using CarShop.Core.BusinessEntities.Base;
using CarShop.WebAPI.Models.Audit.OperationAuditHistory;
using CarShop.WebAPI.Models.Audit.ServiceAuditHistory;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Services
{
    public interface IAuditHistoryService
    {
        IQueryable<ServiceAuditHistoryListModel> GetHistoryServices<TEntity>(int entityId) where TEntity : BaseEntity;

        Task<IQueryable<OperationAuditHistoryListModel>> GetHistoryOperationsAsync(int serviceId);

        Task BeginNewServiceAuditHistoryAsync(string serviceName, string methodName);
    }
}