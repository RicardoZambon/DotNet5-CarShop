using CarShop.Core.BusinessEntities.Audit;
using CarShop.Core.BusinessEntities.Base;
using CarShop.Core.Helper.ExtensionMethods;
using CarShop.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace CarShop.Core.Helper.Audit
{
    public class AuditEntry
    {
        public EntityEntry Entry { get; }
        public EntityState State { get; }
        public bool HasTemporaryProperties { get; }


        public AuditEntry(EntityEntry entry)
        {
            Entry = entry;
            State = Entry.State;
            HasTemporaryProperties = Entry.Properties.Any(x => x.IsTemporary);
        }

        private Dictionary<string, object> GetOldValues()
        {
            switch (State)
            {
                case EntityState.Deleted:
                    return Entry.Properties.ToDictionary(k => k.Metadata.Name, v => v.OriginalValue);

                case EntityState.Modified:
                    return Entry.Properties.Where(x => x.IsValueModified()).ToDictionary(k => k.Metadata.Name, v => v.OriginalValue);

                default:
                    return new Dictionary<string, object>();
            }
        }
        private Dictionary<string, object> GetNewValues()
        {
            switch (State)
            {
                case EntityState.Added:
                    return Entry.Properties.ToDictionary(k => k.Metadata.Name, v => v.CurrentValue);

                case EntityState.Modified:
                    return Entry.Properties.Where(x => x.IsValueModified()).ToDictionary(k => k.Metadata.Name, v => v.CurrentValue);

                default:
                    return new Dictionary<string, object>();
            }
        }

        public OperationAuditHistory GetOperationHistory(ServiceAuditHistory serviceHistory, int currentUserId)
        {
            var baseEntity = Entry.Entity as BaseEntity;

            return new OperationAuditHistory
            {
                ServiceHistoryID = serviceHistory.ID,
                ServiceHistory = serviceHistory,

                TableName = Entry.Metadata.GetTableName(),
                EntityName = Entry.Metadata.DisplayName(),
                EntityID = baseEntity.ID,

                OperationType = State.ToString(),
                OldValues = JsonSerializer.Serialize(GetOldValues()),
                NewValues = JsonSerializer.Serialize(GetNewValues())
            };
        }

        public object GetGenericAuditEntity(OperationAuditHistory auditHistory)
        {
            return typeof(AuditEntry)
                    .GetMethod(nameof(GetAuditEntity))
                    .MakeGenericMethod(new[] { Entry.Metadata.ClrType, Entry.GetAuditEntityType() })
                    .Invoke(this, new object[] { auditHistory });
        }
        public TAuditEntity GetAuditEntity<TEntity, TAuditEntity>(OperationAuditHistory operationHistory) where TEntity : Entity, IAuditable<TAuditEntity> where TAuditEntity : AuditEntity<TEntity>, new()
        {
            var entity = (TEntity)Entry.Entity;

            return new TAuditEntity
            {
                EntityId = entity.ID,
                Entity = entity,

                OperationHistoryID = operationHistory.ID,
                OperationHistory = operationHistory
            };
        }
    }
}