using CarShop.Core.BusinessEntities.Base;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace CarShop.Core.BusinessEntities.Audit
{
    public class OperationAuditHistory : BaseEntity
    {
        public int ServiceHistoryID { get; set; }
        public virtual ServiceAuditHistory ServiceHistory { get; set; }

        public string TableName { get; set; }
        public string EntityName { get; set; }
        public int EntityID { get; set; }

        [StringLength(50)]
        public string OperationType { get; set; }
        public string OldValues { get; set; }
        public string NewValues { get; set; }
    }

    public class OperationHistoryConfiguration : BaseConfiguration<OperationAuditHistory>
    {
        public override void Configure(EntityTypeBuilder<OperationAuditHistory> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.ServiceHistoryID).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            builder.Property(x => x.TableName).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            builder.Property(x => x.EntityName).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            builder.Property(x => x.EntityID).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            builder.Property(x => x.OperationType).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            builder.Property(x => x.OldValues).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            builder.Property(x => x.NewValues).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        }
    }
}