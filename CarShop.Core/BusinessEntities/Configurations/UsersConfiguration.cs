using CarShop.Core.BusinessEntities.Security;
using CarShop.Core.Helper.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarShop.Core.BusinessEntities.Configurations
{
    public class UsersConfiguration : BaseConfiguration<Users>
    {
        public override void Configure(EntityTypeBuilder<Users> builder)
        {
            base.Configure(builder);

            builder.HasData(
                new Users() { ID = 1, Name = "Test", Username = "Test", PasswordHash = PasswordHasher.HashPassword("test") }
            );
        }
    }
}