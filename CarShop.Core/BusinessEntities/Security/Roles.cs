using CarShop.Core.BusinessEntities.Base;
using CarShop.Core.Interfaces;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;

namespace CarShop.Core.BusinessEntities.Security
{
    public class Roles : Entity, IAuditable<RolesAudit>
    {
        public string Name { get; set; }

        public virtual ICollection<RolesAudit> History { get; set; }
    }

    public class RolesAudit : AuditEntity<Roles>
    {
    }


    public class RolesConfiguration : EntityConfiguration<Roles>
    {
        public override void Configure(EntityTypeBuilder<Roles> builder)
        {
            base.Configure(builder);
        }
    }
    public class RolesAuditConfiguration : BaseAuditConfiguration<RolesAudit, Roles>
    {
        public override void Configure(EntityTypeBuilder<RolesAudit> builder)
        {
            base.Configure(builder);
        }
    }
}