using AutoMapper;

namespace CarShop.WebAPI.Models.Audit.OperationAuditHistory
{
    [AutoMap(typeof(Core.BusinessEntities.Audit.OperationAuditHistory), ReverseMap = false)]
    public class OperationAuditHistoryListModel
    {
        public string EntityName { get; set; }

        public string OperationType { get; set; }
        public string OldValues { get; set; }
        public string NewValues { get; set; }
    }
}