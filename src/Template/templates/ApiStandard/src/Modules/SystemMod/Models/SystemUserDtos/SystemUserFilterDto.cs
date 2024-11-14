using Entity.SystemMod;

namespace SystemMod.Models.SystemUserDtos;
/// <summary>
/// 系统用户查询筛选
/// </summary>
/// <inheritdoc cref="SystemUser"/>
public class SystemUserFilterDto : FilterBase
{
    /// <summary>
    /// 用户名
    /// </summary>
    [MaxLength(30)]
    public string? UserName { get; set; }
    /// <summary>
    /// 真实姓名
    /// </summary>
    [MaxLength(30)]
    public string? RealName { get; set; }
    [MaxLength(100)]
    public string? Email { get; set; }
    [MaxLength(20)]
    public string? PhoneNumber { get; set; }
    /// <summary>
    /// 角色id
    /// </summary>
    public Guid? RoleId { get; set; }

    /// <summary>
    /// 角色名
    /// </summary>
    [MaxLength(60)]
    public string? RoleName { get; set; }
}
