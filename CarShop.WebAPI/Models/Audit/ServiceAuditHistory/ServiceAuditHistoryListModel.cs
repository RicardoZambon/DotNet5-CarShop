using AutoMapper;
using System;

namespace CarShop.WebAPI.Models.Audit.ServiceAuditHistory
{
    [AutoMap(typeof(Core.BusinessEntities.Audit.ServiceAuditHistory), ReverseMap = false)]
    public class ServiceAuditHistoryListModel
    {
        public int ID {  get; set; }

        public string Name { get; set; }

        public DateTime ChangedOn { get; set; }

        public string ChangedByName { get; set; }

        public string ChangedByUsername { get; set; }
    }
}