using CarShop.Core.BusinessEntities.Base;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarShop.Core.BusinessEntities.Security
{
    public class Roles : Entity
    {
        public string Name { get; set; }
    }

    public class RolesConfiguration : BaseConfiguration<Roles>
    {
        public override void Configure(EntityTypeBuilder<Roles> builder)
        {
            base.Configure(builder);
        }
    }
}