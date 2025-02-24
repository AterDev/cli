﻿using System.Reflection;
using Ater.Web.Abstraction.Interface;
using Ater.Web.Core.Attributes;
using EntityFramework.DBProvider;
using Microsoft.Extensions.Hosting;

namespace SystemMod.Worker;
/// <summary>
/// 日志记录任务
/// </summary>
public class SystemLogTaskHostedService(IServiceProvider serviceProvider, IEntityTaskQueue<SystemLogs> queue, ILogger<SystemLogTaskHostedService> logger) : BackgroundService
{
    private readonly IServiceProvider _serviceProvider = serviceProvider;
    private readonly ILogger<SystemLogTaskHostedService> _logger = logger;
    private readonly IEntityTaskQueue<SystemLogs> _taskQueue = queue;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation($"🚀 System Log Hosted Service is running.");
        await BackgroundProcessing(stoppingToken);
    }

    private async Task BackgroundProcessing(CancellationToken stoppingToken)
    {
        using IServiceScope scope = _serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<CommandDbContext>();

        while (!stoppingToken.IsCancellationRequested)
        {
            var log = await _taskQueue.DequeueAsync(stoppingToken);
            var entity = log.Data;
            if (entity is string)
            {
                log.TargetName = entity as string;
            }
            else if (entity != null)
            {
                var type = entity.GetType();
                var attribute = type?.GetCustomAttribute<LogDescriptionAttribute>();
                if (attribute != null)
                {
                    log.TargetName = attribute.Description;
                    log.Description ??= log.ActionType + attribute.Description;
                    if (attribute.FieldName != null)
                    {
                        var fieldValue = type!.GetProperty(attribute.FieldName)?.GetValue(entity);
                        if (fieldValue != null)
                        {
                            log.TargetName = fieldValue as string;
                        }
                    }
                }
            }
            try
            {
                context.Add(log);
                await context.SaveChangesAsync(stoppingToken);
                _logger.LogInformation("✍️ New Log:[{object}] {actionUser} {action} {name}",
log.Description, log.ActionUserName, log.ActionType, log.TargetName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred executing {name},{userId},{route},{actionType},{acitonUserName}.", log.TargetName, log.SystemUserId, log.Route, log.ActionType, log.ActionUserName);
            }
        }
    }

    public override async Task StopAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("🛑 System Log Hosted Service is stopping.");
        await base.StopAsync(stoppingToken);
    }
}
