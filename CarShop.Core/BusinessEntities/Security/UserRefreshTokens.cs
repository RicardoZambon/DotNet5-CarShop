using CarShop.Core.BusinessEntities.Base;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShop.Core.BusinessEntities.Security
{
    public class UserRefreshTokens : Entity
    {
        public int UserID { get; set; }
        public virtual Users User { get; set; }

        [Column(TypeName = "VARCHAR(50)")]
        public string Token { get; set; }

        public DateTime Expiration { get; set; }
        public bool IsExpired => DateTime.UtcNow >= Expiration;

        public DateTime Created { get; set; }

        public DateTime? Revoked { get; set; }

        public bool IsActive => Revoked == null && !IsExpired;
    }
}