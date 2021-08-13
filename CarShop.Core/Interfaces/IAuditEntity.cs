namespace CarShop.Core.Interfaces
{
    public interface IAuditEntity
    {
        int OperationHistoryID { get; set; }
        public int EntityId { get; set; }
    }
}