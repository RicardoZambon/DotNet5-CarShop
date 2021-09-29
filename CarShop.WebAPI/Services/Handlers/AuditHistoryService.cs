using AutoMapper;
using AutoMapper.QueryableExtensions;
using CarShop.Core.BusinessEntities.Audit;
using CarShop.Core.BusinessEntities.Base;
using CarShop.Core.Repositories;
using CarShop.Core.Services;
using CarShop.WebAPI.Models.Audit.OperationAuditHistory;
using CarShop.WebAPI.Models.Audit.ServiceAuditHistory;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Services.Handlers
{
    public class AuditHistoryService : IAuditHistoryService
    {
        private readonly IMapper mapper;
        private readonly IAuditUserProvider auditUserProvider;
        private readonly IServiceAuditHistoryRepository serviceAuditHistoryRepository;

        public AuditHistoryService(IMapper mapper, IAuditUserProvider auditUserProvider, IServiceAuditHistoryRepository serviceAuditHistoryRepository)
        {
            this.mapper = mapper;
            this.auditUserProvider = auditUserProvider;
            this.serviceAuditHistoryRepository = serviceAuditHistoryRepository;
        }


        public IQueryable<ServiceAuditHistoryListModel> GetEntityHistoryServices<TEntity>(int entityId) where TEntity : BaseEntity
        {
            return serviceAuditHistoryRepository.GetAllServices<TEntity>(entityId).OrderByDescending(x => x.ChangedOn).ProjectTo<ServiceAuditHistoryListModel>(mapper.ConfigurationProvider);
        }

        public async Task<IQueryable<OperationAuditHistoryListModel>> GetServiceHistoryOperationsAsync(int serviceId)
        {
            return (await serviceAuditHistoryRepository.GetAllOperationsAsync(serviceId)).ProjectTo<OperationAuditHistoryListModel>(mapper.ConfigurationProvider);
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