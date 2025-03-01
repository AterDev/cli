using SystemMod.Managers;
using SystemMod.Models.SystemPermissionDtos;
namespace SystemMod.Controllers.AdminControllers;

/// <summary>
/// 权限
/// </summary>
/// <see cref="SystemPermissionManager"/>
public class SystemPermissionController(
    IUserContext user,
    ILogger<SystemPermissionController> logger,
    SystemPermissionManager manager,
    SystemPermissionGroupManager systemPermissionGroupManager
        ) : RestControllerBase<SystemPermissionManager>(manager, user, logger)
{
    private readonly SystemPermissionGroupManager _systemPermissionGroupManager = systemPermissionGroupManager;

    /// <summary>
    /// 筛选 ✅
    /// </summary>
    /// <param name="filter"></param>
    /// <returns></returns>
    [HttpPost("filter")]
    public async Task<ActionResult<PageList<SystemPermissionItemDto>>> FilterAsync(SystemPermissionFilterDto filter)
    {
        return await _manager.ToPageAsync(filter);
    }

    /// <summary>
    /// 新增 ✅
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<Guid?>> AddAsync(SystemPermissionAddDto dto)
    {
        if (!await _systemPermissionGroupManager.ExistAsync(dto.SystemPermissionGroupId))
        {
            return NotFound("不存在的权限组");
        }
        var id = await _manager.AddAsync(dto);
        return id == null ? Problem(ErrorMsg.AddFailed) : id;
    }

    /// <summary>
    /// 更新 ✅
    /// </summary>
    /// <param name="id"></param>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPatch("{id}")]
    public async Task<ActionResult<bool?>> UpdateAsync([FromRoute] Guid id, SystemPermissionUpdateDto dto)
    {
        SystemPermission? current = await _manager.GetCurrentAsync(id);
        if (current == null)
        {
            return NotFound(ErrorMsg.NotFoundResource);
        };
        if (dto.SystemPermissionGroupId != null && current.Group.Id != dto.SystemPermissionGroupId)
        {
            SystemPermissionGroup? systemPermissionGroup = await _systemPermissionGroupManager.GetCurrentAsync(dto.SystemPermissionGroupId.Value);
            if (systemPermissionGroup == null)
            {
                return NotFound("不存在的权限组");
            }
            current.Group = systemPermissionGroup;
        }
        return await _manager.UpdateAsync(current, dto);
    }

    /// <summary>
    /// 详情 ✅
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<SystemPermissionDetailDto?>> GetDetailAsync([FromRoute] Guid id)
    {
        var res = await _manager.FindAsync<SystemPermissionDetailDto>(d => d.Id == id);
        return res == null ? NotFound() : res;
    }

    /// <summary>
    /// ⚠删除 ✅
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete("{id}")]
    public async Task<ActionResult<bool?>> DeleteAsync([FromRoute] Guid id)
    {
        // 注意删除权限
        SystemPermission? entity = await _manager.GetCurrentAsync(id);
        return entity == null ? NotFound() : await _manager.DeleteAsync([id], false);

    }
}