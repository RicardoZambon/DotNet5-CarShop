using AutoMapper;

namespace CarShop.WebAPI.Models.Security.Roles
{
    [AutoMap(typeof(Core.BusinessEntities.Security.Roles), ReverseMap = true)]
    public class RoleEditModel
    {
        public string Name { get; set; }
    }
}