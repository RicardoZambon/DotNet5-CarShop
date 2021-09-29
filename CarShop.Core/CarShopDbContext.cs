using CarShop.Core.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace CarShop.Core
{
    public class CarShopDbContext : DbContext
    {
        public CarShopDbContext(DbContextOptions<CarShopDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CarShopDbContext).Assembly);
        }


        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            var auditHandler = this.GetService<IAuditHandler>();
            auditHandler.RefreshAuditedEntries(ChangeTracker);

            auditHandler.AddOperationEntitiesBeforeSaving();
            int result = base.SaveChanges(acceptAllChangesOnSuccess);
            auditHandler.AddOperationEntitiesAfterSaved();

            return result;
        }

        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            var auditHandler = this.GetService<IAuditHandler>();
            auditHandler.RefreshAuditedEntries(ChangeTracker);

            await auditHandler.AddOperationEntitiesBeforeSavingAsync();
            int result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
            await auditHandler.AddOperationEntitiesAfterSavedAsync();

            return result;
        }
    }
}