namespace Entity.FileManagerMod;

/// <summary>
/// 文件数据
/// </summary>
[Index(nameof(Md5))]
[Index(nameof(FileName))]
[Index(nameof(Extension))]
[Module(Modules.FileManager)]
public class FileData : EntityBase
{
    public Folder? Folder { get; set; }
    /// <summary>
    /// 文件名
    /// </summary>
    [MaxLength(200)]
    public required string FileName { get; set; }

    /// <summary>
    /// 扩展名
    /// </summary>
    [MaxLength(20)]
    public string? Extension { get; set; }

    /// <summary>
    /// md5值
    /// </summary>
    [MaxLength(100)]
    public required string Md5 { get; set; }

    /// <summary>
    /// 内容
    /// </summary>
    [MaxLength(1024 * 1024 * 2)]
    public required byte[] Content { get; set; }
}
