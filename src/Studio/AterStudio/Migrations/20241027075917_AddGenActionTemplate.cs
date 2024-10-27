using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AterStudio.Migrations
{
    /// <inheritdoc />
    public partial class AddGenActionTemplate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GenActionTmps",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 60, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    ActionContent = table.Column<string>(type: "TEXT", maxLength: 10001024, nullable: false),
                    CreatedTime = table.Column<string>(type: "TEXT", nullable: false),
                    UpdatedTime = table.Column<string>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenActionTmps", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GenActionTmps");
        }
    }
}
