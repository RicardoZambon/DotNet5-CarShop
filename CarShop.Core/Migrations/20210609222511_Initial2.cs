using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarShop.Core.Migrations
{
    public partial class Initial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentMenuID = table.Column<int>(type: "int", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    Label = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", maxLength: 2147483647, nullable: true),
                    ConcurrencyStamp = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "0")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Menus_Menus_ParentMenuID",
                        column: x => x.ParentMenuID,
                        principalTable: "Menus",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "ID", "Icon", "Label", "ParentMenuID", "Url" },
                values: new object[] { 1, "th-large", "Menu-Dashboards", null, "home" });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "ID", "Icon", "Label", "ParentMenuID", "Url" },
                values: new object[] { 2, "shield-alt", "Menu-Security", null, null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "q48RJrWjmws22xTCgOX2Z618H5+wtNTGivsdHuZra1uLEeiH6HXLmL3VyYLkxkf9");

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "ID", "Icon", "Label", "ParentMenuID", "Url" },
                values: new object[] { 5, "bars", "Menu-Menus", 2, "menus" });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "ID", "Icon", "Label", "ParentMenuID", "Url" },
                values: new object[] { 4, "tags", "Menu-Roles", 2, "roles" });

            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "ID", "Icon", "Label", "ParentMenuID", "Url" },
                values: new object[] { 3, "users", "Menu-Users", 2, "users" });

            migrationBuilder.CreateIndex(
                name: "IX_Menus_ParentMenuID",
                table: "Menus",
                column: "ParentMenuID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Menus");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "E0Esx9ReCs+Rsdm4MxRlOZiNf7TirlwSwJKxd51zuI/b0ZsT4LI1z7Cyb5FkJfTI");
        }
    }
}
