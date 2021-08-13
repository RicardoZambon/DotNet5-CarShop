using CarShop.Core.BusinessEntities.Audit;
using CarShop.Core.Helper.Audit;
using CarShop.Core.Helper.Exceptions;
using CarShop.Core.Helper.ExtensionMethods;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.Core.Services.Handlers
{
    public class AuditHandler : IAuditHandler
    {
        private readonly IAuditUserProvider auditUserProvider;
        private readonly CarShopDbContext dbContext;

        private EntityEntry ServiceHistoryEntry { get; set; }
        private ServiceAuditHistory ServiceHistory
        {
            get
            {
                return (ServiceAuditHistory)ServiceHistoryEntry.Entity;
            }
        }

        private List<AuditEntry> AuditedEntries { get; set; } = new List<AuditEntry>();


        public AuditHandler(CarShopDbContext dbContext, IAuditUserProvider auditUserProvider)
        {
            this.dbContext = dbContext;
            this.auditUserProvider = auditUserProvider;
        }



        public void RefreshAuditedEntries(ChangeTracker changeTracker)
        {
            ServiceHistoryEntry = null;
            AuditedEntries = new List<AuditEntry>();

            changeTracker.DetectChanges();
            foreach (var entry in changeTracker.Entries())
            {
                if (entry.Entity is ServiceAuditHistory serviceHistory)
                {
                    if (ServiceHistoryEntry != null)
                    {
                        throw new DuplicatedServiceAuditHistoryException();
                    }

                    ServiceHistoryEntry = entry;
                }
                
                if (!entry.ShouldBeAudited())
                {
                    continue;
                }

                AuditedEntries.Add(new AuditEntry(entry));
            }

            if (ServiceHistoryEntry == null && AuditedEntries.Any())
            {
                throw new MissingServiceAuditHistoryException();
            }
        }


        public void AddOperationEntitiesBeforeSaving()
        {
            foreach (var auditEntry in AuditedEntries.Where(x => !x.HasTemporaryProperties))
            {
                TrackAuditEntry(auditEntry);
            }
        }
        public async Task AddOperationEntitiesBeforeSavingAsync()
        {
            foreach (var auditEntry in AuditedEntries.Where(x => !x.HasTemporaryProperties))
            {
                await TrackAuditEntryAsync(auditEntry);
            }
        }

        public void AddOperationEntitiesAfterSaved()
        {
            if (AuditedEntries.Any())
            {
                foreach (var auditEntry in AuditedEntries.Where(x => x.HasTemporaryProperties))
                {
                    TrackAuditEntry(auditEntry);
                }
                dbContext.SaveChanges();
            }
        }
        public async Task AddOperationEntitiesAfterSavedAsync()
        {
            if (AuditedEntries.Any())
            {
                foreach (var auditEntry in AuditedEntries.Where(x => x.HasTemporaryProperties))
                {
                    await TrackAuditEntryAsync(auditEntry);
                }
                await dbContext.SaveChangesAsync();
            }
        }


        private void TrackAuditEntry(AuditEntry auditEntry)
        {
            var operationHistory = auditEntry.GetOperationHistory(ServiceHistory, auditUserProvider.GetUserID());
            dbContext.Add(operationHistory);

            var auditEntity = auditEntry.GetGenericAuditEntity(operationHistory);
            dbContext.Add(auditEntity);
        }
        private async Task TrackAuditEntryAsync(AuditEntry auditEntry)
        {
            var operationHistory = auditEntry.GetOperationHistory(ServiceHistory, auditUserProvider.GetUserID());
            var operationEntry = await dbContext.AddAsync(operationHistory);

            var auditEntity = auditEntry.GetGenericAuditEntity(operationEntry.Entity);
            await dbContext.AddAsync(auditEntity);
        }
    }
}
