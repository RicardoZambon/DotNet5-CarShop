using CarShop.Core.BusinessEntities.Base;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CarShop.Core.BusinessEntities.Security
{
    public class Menus : Entity
    {
        public int? ParentMenuID { get; set; }
        public virtual Menus ParentMenu { get; set; }

        [StringLength(40)]
        public string Icon { get; set; }

        [StringLength(100)]
        public string Label { get; set; }

        [StringLength(int.MaxValue)]
        public string Url { get; set; }

        public virtual ICollection<Menus> ChildMenus { get; set; }
    }

    public class MenusConfiguration : BaseConfiguration<Menus>
    {
        public override void Configure(EntityTypeBuilder<Menus> builder)
        {
            base.Configure(builder);

            builder.HasData(
                new Menus() { ID = 1, Label = "Menu-Dashboards", Icon = "th-large", Url = "home" },
                new Menus() { ID = 2, Label = "Menu-Security", Icon = "shield-alt" },
                new Menus() { ID = 5, ParentMenuID = 2, Label = "Menu-Menus", Icon = "bars", Url = "menus" },
                new Menus() { ID = 4, ParentMenuID = 2, Label = "Menu-Roles", Icon = "tags", Url = "roles" },
                new Menus() { ID = 3, ParentMenuID = 2, Label = "Menu-Users", Icon = "users", Url = "users" }
            );

        }
    }
}