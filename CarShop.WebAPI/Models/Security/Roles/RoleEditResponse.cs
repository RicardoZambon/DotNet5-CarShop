using AutoMapper;

namespace CarShop.WebAPI.Models.Security.Roles
{
    [AutoMap(typeof(Core.BusinessEntities.Security.Roles), ReverseMap = false)]
    public class RoleEditResponse : RoleEditModel
    {
        public int ID { get; set; }
    }
}