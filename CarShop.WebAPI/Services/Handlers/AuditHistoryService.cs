using CarShop.Core.BusinessEntities.Audit;
using CarShop.Core.Repositories;
using CarShop.Core.Services;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Services.Handlers
{
    public class AuditHistoryService : IAuditHistoryService
    {
        private readonly IAuditUserProvider auditUserProvider;
        private readonly IServiceAuditHistoryRepository serviceAuditHistoryRepository;

        public AuditHistoryService(IAuditUserProvider auditUserProvider, IServiceAuditHistoryRepository serviceAuditHistoryRepository)
        {
            this.auditUserProvider = auditUserProvider;
            this.serviceAuditHistoryRepository = serviceAuditHistoryRepository;
        }


        public async Task BeginNewServiceAuditHistoryAsync(string serviceName, string methodName)
        {
            await serviceAuditHistoryRepository.InsertAsync(new ServiceAuditHistory()
            {
                Name = serviceName + "/" + methodName,
                ChangedByID = auditUserProvider.GetUserID()
            });
        }
    }
}