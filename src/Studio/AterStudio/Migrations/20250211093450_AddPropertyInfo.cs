using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AterStudio.Migrations
{
    /// <inheritdoc />
    public partial class AddPropertyInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PropertyInfo_EntityInfos_EntityInfoId",
                table: "PropertyInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PropertyInfo",
                table: "PropertyInfo");

            migrationBuilder.RenameTable(
                name: "PropertyInfo",
                newName: "PropertyInfos");

            migrationBuilder.RenameIndex(
                name: "IX_PropertyInfo_Type",
                table: "PropertyInfos",
                newName: "IX_PropertyInfos_Type");

            migrationBuilder.RenameIndex(
                name: "IX_PropertyInfo_Name",
                table: "PropertyInfos",
                newName: "IX_PropertyInfos_Name");

            migrationBuilder.RenameIndex(
                name: "IX_PropertyInfo_IsEnum",
                table: "PropertyInfos",
                newName: "IX_PropertyInfos_IsEnum");

            migrationBuilder.RenameIndex(
                name: "IX_PropertyInfo_EntityInfoId",
                table: "PropertyInfos",
                newName: "IX_PropertyInfos_EntityInfoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PropertyInfos",
                table: "PropertyInfos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PropertyInfos_EntityInfos_EntityInfoId",
                table: "PropertyInfos",
                column: "EntityInfoId",
                principalTable: "EntityInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PropertyInfos_EntityInfos_EntityInfoId",
                table: "PropertyInfos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PropertyInfos",
                table: "PropertyInfos");

            migrationBuilder.RenameTable(
                name: "PropertyInfos",
                newName: "PropertyInfo");

            migrationBuilder.RenameIndex(
                name: "IX_PropertyInfos_Type",
                table: "PropertyInfo",
                newName: "IX_PropertyInfo_Type");

            migrationBuilder.RenameIndex(
                name: "IX_PropertyInfos_Name",
                table: "PropertyInfo",
                newName: "IX_PropertyInfo_Name");

            migrationBuilder.RenameIndex(
                name: "IX_PropertyInfos_IsEnum",
                table: "PropertyInfo",
                newName: "IX_PropertyInfo_IsEnum");

            migrationBuilder.RenameIndex(
                name: "IX_PropertyInfos_EntityInfoId",
                table: "PropertyInfo",
                newName: "IX_PropertyInfo_EntityInfoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PropertyInfo",
                table: "PropertyInfo",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PropertyInfo_EntityInfos_EntityInfoId",
                table: "PropertyInfo",
                column: "EntityInfoId",
                principalTable: "EntityInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
