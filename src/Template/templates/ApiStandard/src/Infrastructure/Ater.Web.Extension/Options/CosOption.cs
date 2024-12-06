namespace Ater.Web.Extension.Options;
/// <summary>
/// 腾讯云Cos
/// </summary>
public class CosOption
{
    public required string SecretId { get; set; }
    public required string SecretKey { get; set; }
    public string? BucketName { get; set; }
    public string? AppId { get; set; }
    public string? Cdn { get; set; }
    /// <summary>
    /// 密钥
    /// </summary>
    public required string CdnSecret { get; set; }
}
