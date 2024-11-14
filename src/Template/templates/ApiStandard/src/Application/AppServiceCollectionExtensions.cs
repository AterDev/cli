using EntityFramework.DBProvider;
using Microsoft.Extensions.Caching.Hybrid;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using OpenTelemetry.Exporter;
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace Application;

/// <summary>
/// 应用配置常量
/// </summary>
public static class AppSetting
{
    public const string Components = "Components";
    public const string None = "None";
    public const string Redis = "Redis";
    public const string Memory = "Memory";
    public const string OpenTelemetry = "OpenTelemetry";

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
    /// pgsql/redis/otlp
    /// </summary>
    /// <returns></returns>
    public static IHostApplicationBuilder AddDefaultComponents(this IHostApplicationBuilder builder)
    {
        builder.AddDbContext();
        builder.AddCache();
        var otlpEndpoint = builder.Configuration.GetSection(AppSetting.OpenTelemetry)
            .GetValue<string>("Endpoint");
        otlpEndpoint = otlpEndpoint.NotEmpty() ? otlpEndpoint : builder.Configuration["OTEL_EXPORTER_OTLP_ENDPOINT"] ?? "http://localhost:4317";

        builder.AddOpenTelemetry("MyProjectName", opt =>
        {
            opt.Endpoint = new Uri(otlpEndpoint);
            //opt.Headers = "Authorization=Bearer OpenTelemetry";
        });
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
    /// add cache config
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

        return builder;
    }

    /// <summary>
    /// 添加 OpenTelemetry 服务及选项
    /// </summary>
    /// <param name="builder"></param>
    /// <param name="serviceName"></param>
    /// <param name="otlpOptions"></param>
    /// <param name="loggerOptions"></param>
    /// <param name="tracerProvider"></param>
    /// <param name="meterProvider"></param>
    public static IHostApplicationBuilder AddOpenTelemetry(this IHostApplicationBuilder builder,
        string serviceName,
        Action<OtlpExporterOptions> otlpOptions,
        Action<OpenTelemetryLoggerOptions>? loggerOptions = null,
        Action<TracerProviderBuilder>? tracerProvider = null,
        Action<MeterProviderBuilder>? meterProvider = null)
    {
        var resource = ResourceBuilder.CreateDefault()
            .AddService(serviceName: serviceName, serviceInstanceId: $"{serviceName}_{Environment.MachineName}");

        var section = builder.Configuration.GetSection(AppSetting.OpenTelemetry);
        bool exportConsole = false;
        if (section != null)
        {
            exportConsole = section.Get<OpentelemetryOption>()?.ExportConsole ?? false;
        }

        loggerOptions ??= new Action<OpenTelemetryLoggerOptions>(options =>
        {
            options.SetResourceBuilder(resource);
            options.AddOtlpExporter(otlpOptions);
            options.ParseStateValues = true;
            options.IncludeFormattedMessage = true;
            options.IncludeScopes = true;
            if (exportConsole)
            {
                options.AddConsoleExporter();
            }
        });
        tracerProvider ??= new Action<TracerProviderBuilder>(options =>
        {
            options.AddSource(serviceName)
                .SetResourceBuilder(resource)
                .AddHttpClientInstrumentation(options =>
                {
                    options.RecordException = true;
                })
                .AddAspNetCoreInstrumentation(options =>
                {
                    options.EnrichWithException = (activity, exception) =>
                    {
                        activity.SetTag("stackTrace", exception.StackTrace);
                        activity.SetTag("message", exception.Message);
                    };
                })
                .AddOtlpExporter(otlpOptions);
        });

        meterProvider ??= new Action<MeterProviderBuilder>(options =>
        {
            options.AddMeter(serviceName)
                .SetResourceBuilder(resource)
                .AddHttpClientInstrumentation()
                .AddAspNetCoreInstrumentation()
                .AddOtlpExporter(otlpOptions);
        });
        builder.Services.AddLogging(loggerBuilder =>
        {
            if (exportConsole)
            {
                loggerBuilder.ClearProviders();
            }

            loggerBuilder.AddOpenTelemetry(loggerOptions);
        });
        builder.Services.AddOpenTelemetry()
            .WithTracing(tracerProvider)
            .WithMetrics(meterProvider);

        return builder;
    }
}
