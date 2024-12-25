namespace Entity.OrderMod;
/// <summary>
/// 优惠码
/// </summary>
[Module(Modules.Order)]
public class DiscountCode : EntityBase
{
    /// <summary>
    /// 合作方
    /// </summary>
    [MaxLength(100)]
    public required string PartnerName { get; set; }

    /// <summary>
    /// 优惠码
    /// </summary>
    [MaxLength(8)]
    public required string Code { get; set; }

    /// <summary>
    /// 过期日期
    /// </summary>
    public DateOnly Expired { get; set; }
}
