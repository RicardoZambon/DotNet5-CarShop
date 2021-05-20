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
}