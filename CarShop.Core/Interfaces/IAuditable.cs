using System.Collections.Generic;

namespace CarShop.Core.Interfaces
{
    public interface IAuditable<TAuditEntity> where TAuditEntity : class, IAuditEntity
    {
        ICollection<TAuditEntity> History { get; set; }
    }
}