namespace SystemMod.Models.SystemRoleDtos;
/// <summary>
/// 角色添加时请求结构
/// </summary>
/// <inheritdoc cref="Entity.SystemMod.SystemRole"/>
public class SystemRoleAddDto
{
    /// <summary>
    /// 角色显示名称
    /// </summary>
    [MaxLength(30)]
    public required string Name { get; set; }
    /// <summary>
    /// 角色名，系统标识
    /// </summary>
    [MaxLength(60)]

    public required string NameValue { get; set; } = string.Empty;
    /// <summary>
    /// 是否系统内置,系统内置不可删除
    /// </summary>
    public bool IsSystem { get; set; }
    /// <summary>
    /// 图标
    /// </summary>
    [MaxLength(30)]
    public string? Icon { get; set; }

}
