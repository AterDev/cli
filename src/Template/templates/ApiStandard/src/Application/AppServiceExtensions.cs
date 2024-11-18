using EntityFramework.DBProvider;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Application;

/// <summary>
/// 应用配置常量
/// </summary>
public static class AppSetting
{
    public const string CommandDb = "CommandDb";
    public const string QueryDb = "QueryDb";
    public const string Cache = "Cache";
    public const string CacheInstanceName = "CacheInstanceName";
    public const string Logging = "Logging";
    public const string ProjectName = "MyProjectName";
}

/// <summary>
/// 应用扩展服务
/// </summary>
public static partial class AppServiceExtensions
{
    /// <summary>
    /// 添加数据工厂
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddDbFactory(this IServiceCollection services)
    {
        services.AddSingleton<IDbContextFactory<QueryDbContext>, QueryDbContextFactory>();
        services.AddSingleton<IDbContextFactory<CommandDbContext>, CommandDbContextFactory>();
        return services;
    }

    /// <summary>
    /// 添加数据库上下文
    /// </summary>
    /// <returns></returns>
    public static IHostApplicationBuilder AddDbContext(this IHostApplicationBuilder builder)
    {
        builder.AddSqlServerDbContext<QueryDbContext>(AppSetting.QueryDb);
        builder.AddSqlServerDbContext<CommandDbContext>(AppSetting.CommandDb);
        return builder;
    }

    /// <summary>
    /// add cache config
    /// </summary>
    /// <returns></returns>
    public static IHostApplicationBuilder AddCache(this IHostApplicationBuilder builder)
    {
        // redis 客户端
        builder.AddRedisClient(connectionName: "cache");
        // 分布式缓存
        var cache = builder.Configuration.GetConnectionString(AppSetting.Cache);
        if (cache.NotEmpty())
        {
            builder.Services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = builder.Configuration.GetConnectionString(AppSetting.Cache);
                options.InstanceName = AppSetting.ProjectName;
            });
        }
        // 内存缓存
        builder.Services.AddMemoryCache();
        return builder;
    }
}
