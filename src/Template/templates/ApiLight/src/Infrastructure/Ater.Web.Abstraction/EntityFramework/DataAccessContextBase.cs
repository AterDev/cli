using Microsoft.EntityFrameworkCore;

namespace Ater.Web.Abstraction.EntityFramework;
/// <summary>
/// 数据访问层抽象
/// </summary>
public class DataAccessContextBase<TCommandContext, TQueryContext, TEntity>(TCommandContext commandDbContext, TQueryContext queryDbContext)
    where TCommandContext : DbContext
    where TQueryContext : DbContext
    where TEntity : class, IEntityBase
{
    public TQueryContext QueryContext { get; init; } = queryDbContext;
    public TCommandContext CommandContext { get; init; } = commandDbContext;
}
