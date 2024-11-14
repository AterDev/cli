using SystemMod.Models.SystemLogsDtos;

namespace SystemMod.Managers;
/// <summary>
/// 系统日志
/// </summary>
public class SystemLogsManager(
    DataAccessContext<SystemLogs> dataContext,
    ILogger<SystemLogsManager> logger,
    IUserContext userContext) : ManagerBase<SystemLogs>(dataContext, logger)
{
    private readonly IUserContext _userContext = userContext;

    /// <summary>
    /// 创建待添加实体
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    public async Task<Guid?> AddAsync(SystemLogsAddDto dto)
    {
        SystemLogs entity = dto.MapTo<SystemLogsAddDto, SystemLogs>();
        entity.SystemUserId = _userContext.UserId;
        return await AddAsync(entity) ? entity.Id : null;
    }

    public async Task<bool> UpdateAsync(SystemLogs entity, SystemLogsUpdateDto dto)
    {
        entity.Merge(dto);
        return await UpdateAsync(entity);
    }

    public async Task<PageList<SystemLogsItemDto>> ToPageAsync(SystemLogsFilterDto filter)
    {
        Queryable = Queryable
            .WhereNotNull(filter.ActionUserName, q => q.ActionUserName == filter.ActionUserName)
            .WhereNotNull(filter.TargetName, q => q.TargetName == filter.TargetName)
            .WhereNotNull(filter.ActionType, q => q.ActionType == filter.ActionType);

        if (filter.StartDate.HasValue && filter.EndDate.HasValue)
        {
            // 包含今天
            var endDate = filter.EndDate.Value.AddDays(1);
            Queryable = Queryable.Between(q => q.CreatedTime, filter.StartDate.Value, endDate);
        }
        return await ToPageAsync<SystemLogsFilterDto, SystemLogsItemDto>(filter);
    }

    /// <summary>
    /// 当前用户所拥有的对象
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<SystemLogs?> GetOwnedAsync(Guid id)
    {
        IQueryable<SystemLogs> query = Command.Where(q => q.Id == id);
        // 获取用户所属的对象
        // query = query.Where(q => q.User.Id == _userContext.UserId);
        return await query.FirstOrDefaultAsync();
    }
}
