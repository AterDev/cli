namespace Ater.Web.Core.Models;
public class JwtOption
{
    public required string ValidAudiences { get; set; }
    public required string ValidIssuer { get; set; }
    public required string Sign { get; set; }

    /// <summary>
    /// 过期时间
    /// </summary>
    public int ExpiredSeconds { get; set; } = 24 * 60 * 60;
}
