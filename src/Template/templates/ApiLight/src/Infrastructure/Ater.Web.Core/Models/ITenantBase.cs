namespace Ater.Web.Core.Models;
public interface ITenantBase
{
    /// <summary>
    /// 租户Id
    /// </summary>
    public Guid TenantId { get; set; }
}

public interface ITenantEntityBase : IEntityBase, ITenantBase
{

}
