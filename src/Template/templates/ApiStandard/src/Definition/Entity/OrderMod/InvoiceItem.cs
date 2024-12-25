namespace Entity.OrderMod;

/// <summary>
/// 对账单明细
/// </summary>
[Module(Modules.Order)]
public class InvoiceItem : EntityBase
{
    [ForeignKey(nameof(InvoiceId))]
    public Invoice Invoice { get; set; } = null!;
    public Guid InvoiceId { get; set; }

    /// <summary>
    /// 商品描述
    /// </summary>
    [MaxLength(200)]
    public string? Description { get; set; }

    /// <summary>
    /// 商品单价
    /// </summary>
    public decimal UnitPrice { get; set; }

    /// <summary>
    /// 商品数量
    /// </summary>
    public int Quantity { get; set; }

    /// <summary>
    /// 商品小计
    /// </summary>
    public decimal Subtotal => UnitPrice * Quantity;
}