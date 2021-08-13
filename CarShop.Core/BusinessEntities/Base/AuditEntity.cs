using CarShop.Core.BusinessEntities.Audit;
using CarShop.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarShop.Core.BusinessEntities.Base
{
    public abstract class AuditEntity<TEntity> : BaseEntity, IAuditEntity where TEntity : Entity
    {
        public int OperationHistoryID { get; set; }
        public virtual OperationAuditHistory OperationHistory { get; set; }

        public int EntityId { get; set; }
        public virtual TEntity Entity { get; set; }
    }

    public abstract class BaseAuditConfiguration<TAuditEntity, TEntity> : BaseConfiguration<TAuditEntity> where TAuditEntity : AuditEntity<TEntity> where TEntity : Entity, IAuditable<TAuditEntity>
    {
        public override void Configure(EntityTypeBuilder<TAuditEntity> builder)
        {
            builder.Property(x => x.OperationHistoryID).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            builder.HasOne(x => x.OperationHistory).WithMany().HasForeignKey(x => x.OperationHistoryID).OnDelete(DeleteBehavior.NoAction);

            builder.Property(x => x.EntityId).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            builder.HasOne(x => x.Entity).WithMany(x => x.History).HasForeignKey(x => x.EntityId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}