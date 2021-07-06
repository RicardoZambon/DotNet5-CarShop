using AutoMapper;

namespace CarShop.WebAPI.Models.Security.Roles
{
    [AutoMap(typeof(Core.BusinessEntities.Security.Roles), ReverseMap = false)]
    public class RoleListModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
