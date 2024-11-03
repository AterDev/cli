namespace Share.Models.GenActionDtos;
/// <summary>
/// 操作执行模型
/// </summary>
public class GenActionRunDto
{
    /// <summary>
    /// 操作id
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// 源文件路径 
    /// </summary>
    public string? SourceFilePath { get; set; }

    /// <summary>
    /// 仅输出
    /// </summary>
    public bool OnlyOutput { get; set; }
}
