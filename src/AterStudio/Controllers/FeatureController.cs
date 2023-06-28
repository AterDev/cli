﻿using AterStudio.Advance;
using AterStudio.Manager;
using AterStudio.Models;
using Microsoft.AspNetCore.Mvc;

namespace AterStudio.Controllers;

/// <summary>
/// 功能模块
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class FeatureController : ControllerBase
{
    private readonly ProjectManager _manager;
    private readonly EntityAdvance _advace;
    private readonly FeatureManager _feature;
    public FeatureController(ProjectManager manager, EntityAdvance advace, FeatureManager feature)
    {
        _manager = manager;
        _advace = advace;
        _feature = feature;
    }

    /// <summary>
    /// 创建新解决方案
    /// </summary>
    /// <returns></returns>
    [HttpPost("newSolution")]
    public async Task<ActionResult<bool>> CreateNewSolution(CreateSolutionDto dto)
    {
        var res = await _feature.CreateNewSolutionAsync(dto);
        return res ? true : Problem(_feature.ErrorMsg);
    }
}
