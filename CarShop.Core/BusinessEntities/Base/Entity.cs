using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace CarShop.Core.BusinessEntities.Base
{
    public abstract class Entity
    {
        [Key]
        public int ID { get; set; }

        [Timestamp]
        public byte[] ConcurrencyStamp { get; set; }

        public bool IsDeleted { get; set; }
    }

    public abstract class BaseConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : Entity
    {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.Property(x => x.IsDeleted).HasDefaultValueSql("0");

            builder.HasQueryFilter(x => !x.IsDeleted);
        }
    }
}