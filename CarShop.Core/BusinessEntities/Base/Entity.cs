using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace CarShop.Core.BusinessEntities.Base
{
    public abstract class Entity : BaseEntity
    {
        [Timestamp]
        public byte[] ConcurrencyStamp { get; set; }

        public bool IsDeleted { get; set; }
    }

    public abstract class EntityConfiguration<TEntity> : BaseConfiguration<TEntity> where TEntity : Entity
    {
        public override void Configure(EntityTypeBuilder<TEntity> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.IsDeleted).HasDefaultValueSql("0");

            builder.HasQueryFilter(x => !x.IsDeleted);
        }
    }
}