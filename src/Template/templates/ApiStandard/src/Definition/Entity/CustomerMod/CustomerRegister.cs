namespace Entity.CustomerMod;
/// <summary>
/// 客户登记信息
/// </summary>
[Module(Modules.Customer)]
[Index(nameof(Name))]
[Index(nameof(UnifiedCode))]
public class CustomerRegister : EntityBase
{
    /// <summary>
    /// 客户名称:姓名/公司名称
    /// </summary>
    [MaxLength(50)]
    public required string Name { get; set; }
    /// <summary>
    /// 客户描述
    /// </summary>
    [MaxLength(500)]
    public string? Description { get; set; }

    /// <summary>
    /// 地址
    /// </summary>
    [MaxLength(300)]
    public string? Address { get; set; }

    /// <summary>
    /// 联系人姓名
    /// </summary>
    [MaxLength(30)]
    public string? ContactName { get; set; }
    /// <summary>
    /// 联系人电话
    /// </summary>
    [MaxLength(30)]
    public string? ContactPhone { get; set; }
    /// <summary>
    /// 说明备注
    /// </summary>
    [MaxLength(2000)]
    public string? Remark { get; set; }

    /// <summary>
    /// 客户类型
    /// </summary>
    public CustomerType CustomerType { get; set; }

    #region 公司字段

    public CompanyType CompanyType { get; set; }

    /// <summary>
    /// 统一社会信用代码
    /// </summary>
    [MaxLength(60)]
    public string? UnifiedCode { get; set; }

    /// <summary>
    /// 法人
    /// </summary>
    [MaxLength(50)]
    public string? LegalPerson { get; set; }

    /// <summary>
    /// 发票类型
    /// </summary>
    public InvoiceType? InvoiceType { get; set; }

    /// <summary>
    /// 银行开户行
    /// </summary>
    [MaxLength(100)]
    public string? BankName { get; set; }

    /// <summary>
    /// 银行账户
    /// </summary>
    [MaxLength(50)]
    public string? BankAccount { get; set; }

    #endregion
}
/// <summary>
/// 公司/机构 类型
/// </summary>
public enum CompanyType
{
    // TODO:定义类型
}

/// <summary>
/// 发票类型
/// </summary>
public enum InvoiceType
{
    /// <summary>
    /// 增值税普通发票
    /// </summary>
    [Display(Name = "增值税普通发票")]
    Regular,

    /// <summary>
    /// 增值税专用发票
    /// </summary>
    [Display(Name = "增值税专用发票")]
    Special
}
