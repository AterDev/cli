﻿using AterStudio.Manager;
using AterStudio.Models;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AterStudio.Controllers;

/// <summary>
/// api文档
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ApiDocController : ControllerBase
{
    private readonly SwaggerManager _manager;
    private readonly ProjectManager _project;
    public ApiDocController(SwaggerManager manager, ProjectManager project)
    {
        _manager = manager;
        _project = project;
    }

    /// <summary>
    /// 获取项目文档
    /// </summary>
    /// <param name="id">项目id</param>
    /// <returns></returns>
    [HttpGet("all/{id}")]
    public ActionResult<List<ApiDocInfo>> List([FromRoute] Guid id)
    {
        var project = _project.GetProjectAsync(id);
        return project == null
            ? NotFound("不存在的项目")
            : _manager.FindAll(project);
    }

    /// <summary>
    /// 获取某个文档信息
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiDocContent?>> GetApiDocContentAsync([FromRoute] Guid id)
    {
        var res = await _manager.GetContentAsync(id);
        if (res == null)
        {
            return Problem(_manager.ErrorMsg);
        }
        return res;
    }


    /// <summary>
    ///  添加
    /// </summary>
    /// <param name="apiDocInfo"></param>
    /// <returns></returns>
    [HttpPost]
    public ActionResult<ApiDocInfo> Add(ApiDocInfo apiDocInfo)
    {
        return _manager.AddApiDoc(apiDocInfo);
    }

    /// <summary>
    ///  更新
    /// </summary>
    /// <param name="id"></param>
    /// <param name="apiDocInfo"></param>
    /// <returns></returns>
    [HttpPut("{id}")]
    public ActionResult<ApiDocInfo> Update([FromRoute] Guid id, ApiDocInfo apiDocInfo)
    {
        var res = _manager.UpdateApiDoc(id, apiDocInfo);
        if (res == null)
        {
            return NotFound("未找到该对象");
        }
        return res;
    }

    /// <summary>
    /// 删除
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete("{id}")]
    public bool Delete([FromRoute] Guid id)
    {
        return _manager.Delete(id);
    }

    /// <summary>
    /// 生成页面组件
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPost("component")]
    public NgComponentInfo CreateUIComponent(CreateUIComponentDto dto)
    {
        return _manager.CreateUIComponent(dto);
    }
}
