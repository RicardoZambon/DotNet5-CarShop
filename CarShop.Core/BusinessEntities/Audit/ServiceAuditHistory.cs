using CarShop.Core.BusinessEntities.Base;
using CarShop.Core.BusinessEntities.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CarShop.Core.BusinessEntities.Audit
{
    public class ServiceAuditHistory : BaseEntity
    {
        [StringLength(200)]
        public string Name { get; set; }

        public DateTime ChangedOn { get; set; }
        public int ChangedByID { get; set; }
        public virtual Users ChangedBy { get; set; }

        public virtual ICollection<OperationAuditHistory> Operations { get; set; }
    }

    public class ServiceHistoryConfiguration : BaseConfiguration<ServiceAuditHistory>
    {
        public override void Configure(EntityTypeBuilder<ServiceAuditHistory> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Name).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            builder.Property(x => x.ChangedOn).Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Ignore);
            builder.Property(x => x.ChangedOn).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            builder.Property(x => x.ChangedOn).HasDefaultValueSql("GETDATE()");

            builder.Property(x => x.ChangedByID).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            builder.HasOne(x => x.ChangedBy).WithMany().HasForeignKey(x => x.ChangedByID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}