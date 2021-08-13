using System.Threading.Tasks;

namespace CarShop.WebAPI.Services
{
    public interface IAuditHistoryService
    {
        Task BeginNewServiceAuditHistoryAsync(string serviceName, string methodName);
    }
}