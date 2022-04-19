using AutoMapper;

namespace CarShop.WebAPI.Models.Audit.OperationAuditHistory
{
    [AutoMap(typeof(Core.BusinessEntities.Audit.OperationAuditHistory), ReverseMap = false)]
    public class OperationAuditHistoryViewModel
    {
        public string OldValues { get; set; }
        public string NewValues { get; set; }
    }
}