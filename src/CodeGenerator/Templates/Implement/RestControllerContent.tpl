﻿using ${ShareNamespace}.Models.${EntityName}Dtos;
namespace ${Namespace}.Controllers;

${Comment}
public class ${EntityName}${APISuffix} : RestControllerBase<I${EntityName}Manager>
{
${AdditionManagersProps}

    public ${EntityName}${APISuffix}(
        IUserContext user,
        ILogger<${EntityName}${APISuffix}> logger,
        I${EntityName}Manager manager${AdditionManagersDI}
        ) : base(manager, user, logger)
    {
${AdditionManagersInit}
    }

    /// <summary>
    /// 筛选
    /// </summary>
    /// <param name="filter"></param>
    /// <returns></returns>
    [HttpPost("filter")]
    public async Task<ActionResult<PageList<${EntityName}ItemDto>>> FilterAsync(${EntityName}FilterDto filter)
    {
        return await manager.FilterAsync(filter);
    }

    /// <summary>
    /// 新增
    /// </summary>
    /// <param name="form"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<${EntityName}>> AddAsync(${EntityName}AddDto dto)
    {
${AddActionBlock}
    }

    /// <summary>
    /// 更新
    /// </summary>
    /// <param name="id"></param>
    /// <param name="form"></param>
    /// <returns></returns>
    [HttpPut("{id}")]
    public async Task<ActionResult<${EntityName}?>> UpdateAsync([FromRoute] ${IdType} id, ${EntityName}UpdateDto dto)
    {
${UpdateActionBlock}
    }

    /// <summary>
    /// 详情
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<${EntityName}?>> GetDetailAsync([FromRoute] ${IdType} id)
    {
        var res = await manager.FindAsync(id);
        return (res == null) ? NotFound() : res;
    }

    /// <summary>
    /// ⚠删除
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    // [ApiExplorerSettings(IgnoreApi = true)]
    [HttpDelete("{id}")]
    public async Task<ActionResult<${EntityName}?>> DeleteAsync([FromRoute] ${IdType} id)
    {
        // TODO:实现删除逻辑,注意删除权限
        var entity = await manager.GetOwnedAsync(id);
        if (entity == null) return NotFound();
        return Forbid();
        // return await manager.DeleteAsync(entity);
    }
}