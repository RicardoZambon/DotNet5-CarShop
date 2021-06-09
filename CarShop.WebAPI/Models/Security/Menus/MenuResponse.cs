using AutoMapper;

namespace CarShop.WebAPI.Models.Security.Menus
{
    [AutoMap(typeof(Core.BusinessEntities.Security.Menus), ReverseMap = false)]
    public class MenuResponse
    {
        public int ID { get; set; }
        public int? ParentMenuID { get; set; }
        public string Icon { get; set; }
        public string Label { get; set; }
        public string Url { get; set; }
    }
}