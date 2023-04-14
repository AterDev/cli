﻿namespace Core.Models;
/// <summary>
/// 项目配置
/// </summary>
public class ConfigOptions
{
    /// <summary>
    /// 项目根目录 
    /// </summary>
    public string RootPath { get; set; } = "./";

    public Guid ProjectId { get; set; }
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

    public double Version { get; set; } = 1.0;
    /// <summary>
    /// swagger地址
    /// </summary>
    public string? SwaggerPath { get; set; }
    /// <summary>
    /// 前端路径
    /// </summary>
    public string? WebAppPath { get; set; }
}
