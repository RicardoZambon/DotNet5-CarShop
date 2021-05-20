using CarShop.Core.BusinessEntities.Base;
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
}