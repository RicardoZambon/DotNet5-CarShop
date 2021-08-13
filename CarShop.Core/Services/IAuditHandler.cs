using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Threading.Tasks;

namespace CarShop.Core.Services
{
    public interface IAuditHandler
    {
        void RefreshAuditedEntries(ChangeTracker changeTracker);

        void AddOperationEntitiesBeforeSaving();
        Task AddOperationEntitiesBeforeSavingAsync();

        void AddOperationEntitiesAfterSaved();
        Task AddOperationEntitiesAfterSavedAsync();
    }
}