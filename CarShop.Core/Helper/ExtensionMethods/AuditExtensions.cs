using CarShop.Core.BusinessEntities.Audit;
using CarShop.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;

namespace CarShop.Core.Helper.ExtensionMethods
{
    public static class AuditExtensions
    {
        internal static bool ShouldBeAudited(this EntityEntry entry)
        {
            return entry.State != EntityState.Detached && entry.State != EntityState.Unchanged &&
                   !(entry.Entity is ServiceAuditHistory) && !(entry.Entity is OperationAuditHistory) && !(entry.Entity is IAuditEntity) &&
                   entry.IsAuditable();
        }

        internal static bool IsAuditable(this EntityEntry entry)
        {
            return entry.Entity.GetType().ImplementsGenericInterface(typeof(IAuditable<>));
        }

        internal static Type GetAuditEntityType(this EntityEntry entry)
        {
            return entry.Entity.GetType().GetGenericInterfaceType(typeof(IAuditable<>));
        }


        internal static bool IsValueModified(this PropertyEntry property)
        {
            return property.IsModified
                && (
                    property.OriginalValue != null && property.CurrentValue == null
                    || property.OriginalValue == null && property.CurrentValue != null
                    || (
                        property.OriginalValue != null && property.CurrentValue != null
                        && !property.OriginalValue.Equals(property.CurrentValue)
                    )
                );
        }
    }
}