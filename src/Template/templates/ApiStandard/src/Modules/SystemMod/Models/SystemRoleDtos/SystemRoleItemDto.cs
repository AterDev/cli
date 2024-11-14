namespace SystemMod.Models.SystemRoleDtos;
/// <summary>
/// 角色列表元素
/// </summary>
/// <inheritdoc cref="Entity.SystemMod.SystemRole"/>
public class SystemRoleItemDto
{
    /// <summary>
    /// 角色显示名称
    /// </summary>
    [MaxLength(30)]
    public string Name { get; set; } = default!;
    /// <summary>
    /// 角色名，系统标识
    /// </summary>
    public string NameValue { get; set; } = default!;
    /// <summary>
    /// 是否系统内置,系统内置不可删除
    /// </summary>
    public bool IsSystem { get; set; }
    /// <summary>
    /// 图标
    /// </summary>
    [MaxLength(30)]
    public string? Icon { get; set; }
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTimeOffset CreatedTime { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset UpdatedTime { get; set; } = DateTimeOffset.UtcNow;

}
