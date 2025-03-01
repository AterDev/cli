using Entity.CMSMod;

namespace CMSMod.Models.BlogDtos;
/// <summary>
/// 博客查询筛选
/// </summary>
/// <inheritdoc cref="Blog"/>
public class BlogFilterDto : FilterBase
{
    /// <summary>
    /// 标题
    /// </summary>
    [MaxLength(100)]
    public string? Title { get; set; }
    /// <summary>
    /// 描述
    /// </summary>
    [MaxLength(300)]
    public string? Description { get; set; }
    /// <summary>
    /// 作者
    /// </summary>
    [MaxLength(200)]
    public string? Authors { get; set; }
    /// <summary>
    /// 标题
    /// </summary>
    [MaxLength(200)]
    public string? TranslateTitle { get; set; }
    /// <summary>
    /// 语言类型
    /// </summary>
    public LanguageType? LanguageType { get; set; }
    /// <summary>
    /// 全站类别
    /// </summary>
    public BlogType? BlogType { get; set; }
    /// <summary>
    /// 是否审核
    /// </summary>
    public bool? IsAudit { get; set; }
    /// <summary>
    /// 是否公开
    /// </summary>
    public bool? IsPublic { get; set; }
    /// <summary>
    /// 是否原创
    /// </summary>
    public bool? IsOriginal { get; set; }
    public Guid? UserId { get; set; }
    public Guid? CatalogId { get; set; }
    /// <summary>
    /// 浏览量
    /// </summary>
    public int? ViewCount { get; set; }

}
