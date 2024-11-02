﻿using Share.Models.GenActionDtos;
using Share.Models.GenStepDtos;
namespace AterStudio.Controllers;

/// <summary>
/// 生成操作
/// </summary>
public class GenActionController(
    IUserContext user,
    ILogger<GenActionController> logger,
    GenActionManager manager
    ) : RestControllerBase<GenActionManager>(manager, user, logger)
{
    /// <summary>
    /// 分页数据
    /// </summary>
    /// <param name="filter"></param>
    /// <returns></returns>
    [HttpPost("filter")]
    public async Task<ActionResult<PageList<GenActionItemDto>>> FilterAsync(GenActionFilterDto filter)
    {
        return await _manager.ToPageAsync(filter);
    }

    /// <summary>
    /// 获取操作步骤
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("steps/{id}")]
    public async Task<ActionResult<List<GenStepItemDto>>> GetStepsAsync(Guid id)
    {
        return await _manager.GetStepsAsync(id);
    }

    /// <summary>
    /// 获取模型列表
    /// </summary>
    /// <param name="sourceType"></param>
    /// <returns></returns>
    [HttpGet("modelFile")]
    public List<ModelFileItemDto> GetModelFile(GenSourceType sourceType)
    {
        return _manager.GetModelFile(sourceType);
    }

    /// <summary>
    /// 添加操作步骤
    /// </summary>
    /// <param name="id"></param>
    /// <param name="stepIds"></param>
    /// <returns></returns>
    [HttpPost("steps/{id}")]
    public async Task<ActionResult<bool>> AddStepsAsync(Guid id, List<Guid> stepIds)
    {
        return await _manager.AddStepsAsync(id, stepIds);
    }

    /// <summary>
    /// 新增
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<Guid?>> AddAsync(GenActionAddDto dto)
    {
        // 冲突验证
        // if(await _manager.IsUniqueAsync(dto.xxx)) { return Conflict(ErrorMsg.ConflictResource); }
        var id = await _manager.CreateNewEntityAsync(dto);
        return id == null ? Problem(ErrorMsg.AddFailed) : id;
    }

    /// <summary>
    /// 更新数据
    /// </summary>
    /// <param name="id"></param>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPatch("{id}")]
    public async Task<ActionResult<bool>> UpdateAsync([FromRoute] Guid id, GenActionUpdateDto dto)
    {
        var entity = await _manager.GetOwnedAsync(id);
        if (entity == null) { return NotFound(ErrorMsg.NotFoundResource); }
        // 冲突验证
        return await _manager.UpdateAsync(entity, dto);
    }

    /// <summary>
    /// 执行操作
    /// </summary>
    /// <param name="id"></param>
    /// <param name="path"></param>
    /// <returns></returns>
    [HttpPost("execute/{id}")]
    public async Task<ActionResult<bool>> ExecuteAsync(Guid id, string? path)
    {
        var exist = await _manager.ExistAsync(id);
        if (!exist) { return NotFound(ErrorMsg.NotFoundResource); }
        // return Forbid();
        return await _manager.ExecuteActionAsync(id, path);
    }


    /// <summary>
    /// 获取详情
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<GenActionDetailDto?>> GetDetailAsync([FromRoute] Guid id)
    {
        var res = await _manager.GetDetailAsync(id);
        return res == null ? NotFound() : res;
    }

    /// <summary>
    /// 删除
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteAsync([FromRoute] Guid id)
    {
        // 注意删除权限
        var entity = await _manager.GetOwnedAsync(id);
        if (entity == null) { return NotFound(); };
        // return Forbid();
        return await _manager.DeleteAsync(entity, false);
    }
}