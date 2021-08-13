using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarShop.Core.Migrations
{
    public partial class initial4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServiceAuditHistory",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    ChangedOn = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    ChangedByID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceAuditHistory", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ServiceAuditHistory_Users_ChangedByID",
                        column: x => x.ChangedByID,
                        principalTable: "Users",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "OperationAuditHistory",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServiceHistoryID = table.Column<int>(type: "int", nullable: false),
                    TableName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntityName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EntityID = table.Column<int>(type: "int", nullable: false),
                    OperationType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    OldValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewValues = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationAuditHistory", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OperationAuditHistory_ServiceAuditHistory_ServiceHistoryID",
                        column: x => x.ServiceHistoryID,
                        principalTable: "ServiceAuditHistory",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RolesAudit",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OperationHistoryID = table.Column<int>(type: "int", nullable: false),
                    EntityId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolesAudit", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RolesAudit_OperationAuditHistory_OperationHistoryID",
                        column: x => x.OperationHistoryID,
                        principalTable: "OperationAuditHistory",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_RolesAudit_Roles_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Roles",
                        principalColumn: "ID");
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "D7CJC09fSWEK6SKDHpUxFWlOlGnSpSW46gbJzLQbaNb2ymi9CnewIM1QtoBg31Ad");

            migrationBuilder.CreateIndex(
                name: "IX_OperationAuditHistory_ServiceHistoryID",
                table: "OperationAuditHistory",
                column: "ServiceHistoryID");

            migrationBuilder.CreateIndex(
                name: "IX_RolesAudit_EntityId",
                table: "RolesAudit",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_RolesAudit_OperationHistoryID",
                table: "RolesAudit",
                column: "OperationHistoryID");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceAuditHistory_ChangedByID",
                table: "ServiceAuditHistory",
                column: "ChangedByID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RolesAudit");

            migrationBuilder.DropTable(
                name: "OperationAuditHistory");

            migrationBuilder.DropTable(
                name: "ServiceAuditHistory");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "hD4kR9TOvVMU6SaGOQP/r1wWVaThyVyZC8FVl6KMN3Vn6Sd82wAdxtbXod0gXRy2");
        }
    }
}
