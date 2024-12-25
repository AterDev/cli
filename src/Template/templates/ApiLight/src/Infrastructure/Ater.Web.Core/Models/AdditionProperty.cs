using System.ComponentModel.DataAnnotations;

namespace Ater.Web.Core.Models;
/// <summary>
///  扩展属性
/// </summary>
public class AdditionProperty
{
    [MaxLength(30)]
    public required string Name { get; set; }

    public required string Value { get; set; }

    /// <summary>
    /// 排序
    /// </summary>
    public int Sort { get; set; }

    /// <summary>
    /// 是否必须
    /// </summary>
    public bool IsRequire { get; set; }

    public PropertyValueType JsonValueType { get; set; } = PropertyValueType.String;
}

public enum PropertyValueType
{
    /// <summary>
    /// 数字
    /// </summary>
    [Description("数字")]
    Number,
    /// <summary>
    /// 字符串
    /// </summary>
    [Description("字符串")]
    String,
    /// <summary>
    /// 布尔值
    /// </summary>
    [Description("布尔值")]
    Boolean,
    /// <summary>
    /// 对象
    /// </summary>
    [Description("对象")]
    Object,
    /// <summary>
    /// 数组
    /// </summary>
    [Description("数组")]
    Array
}
