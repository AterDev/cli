using Application.Const;
using EntityFramework.DBProvider;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Application;
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
        builder.AddSqlServerDbContext<QueryDbContext>(AterConst.QueryDb);
        builder.AddSqlServerDbContext<CommandDbContext>(AterConst.CommandDb);
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
        var cache = builder.Configuration.GetConnectionString(AterConst.Cache);
        if (cache.NotEmpty())
        {
            builder.Services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = builder.Configuration.GetConnectionString(AterConst.Cache);
                options.InstanceName = Constant.ProjectName;
            });
        }
        // 内存缓存
        builder.Services.AddMemoryCache();
        return builder;
    }
}
