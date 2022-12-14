﻿namespace Core.Models;

public class ConfigOptions
{
    /// <summary>
    /// 项目根目录 
    /// </summary>
    public string RootPath { get; set; } = "./";

    public string ProjectId { get; set; } = null!;
    /// <summary>
    /// dto项目目录
    /// </summary>
    public string DtoPath { get; set; } = "Share";
    public string EntityPath { get; set; } = "Core";
    public string DbContextPath { get; set; } = "Database/EntityFramework";
    public string StorePath { get; set; } = "Application";
    public string ApiPath { get; set; } = "Http.API";

    /// <summary>
    /// NameId/Id
    /// </summary>
    public string IdStyle { get; set; } = "Id";
    public string IdType { get; set; } = "Guid";
    public string CreatedTimeName { get; set; } = "CreatedTime";
    public string UpdatedTimeName { get; set; } = "UpdatedTime";
}
