using Definition.EntityFramework.DBProvider;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Application;

/// <summary>
/// 应用配置常量
/// </summary>
public class AppSetting
{
    public const string Components = "Components";
    public const string None = "None";
    public const string Redis = "Redis";
    public const string Memory = "Memory";
    public const string CommandDB = "CommandDb";
    public const string QueryDB = "QueryDb";
    public const string Cache = "Cache";
    public const string CacheInstanceName = "CacheInstanceName";
    public const string Logging = "Logging";
}

/// <summary>
/// 服务注册扩展
/// </summary>
public static partial class AppServiceCollectionExtensions
{
    /// <summary>
    /// 添加默认应用组件
    /// database/cache
    /// </summary>
    /// <returns></returns>
    public static IHostApplicationBuilder AddDefaultComponents(this IHostApplicationBuilder builder)
    {
        builder.AddDbContext();
        builder.AddCache();
        return builder;
    }

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
        var commandString = builder.Configuration.GetConnectionString(AppSetting.CommandDB);
        var queryString = builder.Configuration.GetConnectionString(AppSetting.QueryDB);
        builder.Services.AddDbContextPool<QueryDbContext>(option =>
        {
            option.UseNpgsql(queryString, sql =>
            {
                sql.MigrationsAssembly("Http.API");
                sql.CommandTimeout(10);
            });
        });
        builder.Services.AddDbContextPool<CommandDbContext>(option =>
        {
            option.UseNpgsql(commandString, sql =>
            {
                sql.MigrationsAssembly("Http.API");
                sql.CommandTimeout(10);
            });
        });
        return builder;
    }

    /// <summary>
    /// add cache
    /// </summary>
    /// <returns></returns>
    public static IHostApplicationBuilder AddCache(this IHostApplicationBuilder builder)
    {
        var cache = builder.Configuration.GetSection(AppSetting.Components).GetValue<string>(AppSetting.Cache);
        if (cache == AppSetting.Redis)
        {
            builder.Services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = builder.Configuration.GetConnectionString(AppSetting.Cache);
                options.InstanceName = builder.Configuration.GetConnectionString(AppSetting.CacheInstanceName);
            });
        }
        else
        {
            builder.Services.AddDistributedMemoryCache();
        }
        return builder;
    }
}
