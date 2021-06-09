using CarShop.Core.BusinessEntities.Base;
using CarShop.Core.Helper.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CarShop.Core.BusinessEntities.Security
{
    public class Users : Entity
    {
        [StringLength(100)]
        public string Username { get; set; }

        [StringLength(200)]
        public string Name { get; set; }

        [StringLength(200)]
        public string PasswordHash { get; set; }


        public virtual ICollection<Roles> Roles { get; set; }

        public virtual ICollection<UserRefreshTokens> RefreshTokens { get; set; }
    }

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