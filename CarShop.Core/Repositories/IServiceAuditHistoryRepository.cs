using CarShop.Core.BusinessEntities.Audit;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories
{
    public interface IServiceAuditHistoryRepository
    {
        Task InsertAsync(ServiceAuditHistory role);
    }
}