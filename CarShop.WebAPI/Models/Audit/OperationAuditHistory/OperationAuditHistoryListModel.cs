using AutoMapper;

namespace CarShop.WebAPI.Models.Audit.OperationAuditHistory
{
    [AutoMap(typeof(Core.BusinessEntities.Audit.OperationAuditHistory), ReverseMap = false)]
    public class OperationAuditHistoryListModel
    {
        public int ID { get; set; }
        public string OperationType { get; set; }
        public string EntityName { get; set; }
        public int EntityID { get; set; }
    }
}