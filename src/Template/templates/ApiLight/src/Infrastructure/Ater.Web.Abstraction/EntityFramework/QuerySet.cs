// 对常见查询方法的实现

using Ater.Web.Abstraction.Interface;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
namespace Ater.Web.Abstraction.EntityFramework;

/// <summary>
/// 只读仓储基类
/// </summary>
/// <typeparam name="TEntity"></typeparam>
public class QuerySet<TContent, TEntity> :
    IQueryStore<TEntity>, IQueryStoreExt<TEntity>
    where TContent : DbContext
    where TEntity : class, IEntityBase
{
    public DbSet<TEntity> Db { get; }
    public DatabaseFacade Database { get; init; }
    public IQueryable<TEntity> Queryable { get; private set; }

    /// <summary>
    ///  是否开户全局筛选
    /// </summary>
    public bool EnableGlobalQuery { get; set; } = true;

    public QuerySet(TContent queryDbContext)
    {
        Db = queryDbContext.Set<TEntity>();
        Queryable = EnableGlobalQuery
            ? Db.AsQueryable()
            : Db.IgnoreQueryFilters().AsQueryable();
        Database = queryDbContext.Database;
    }

    private void ResetQuery()
    {
        Queryable = EnableGlobalQuery
            ? Db.AsQueryable()
            : Db.IgnoreQueryFilters().AsQueryable();
    }

    public virtual async Task<TEntity?> FindAsync(Guid id)
    {
        TEntity? res = await Queryable.Where(d => d.Id == id)
            .AsNoTracking()
            .FirstOrDefaultAsync();
        ResetQuery();
        return res;
    }

    public virtual async Task<TDto?> FindAsync<TDto>(Guid id)
        where TDto : class
    {
        TDto? res = await Queryable.Where(d => d.Id == id)
            .AsNoTracking()
            .ProjectTo<TDto>()
            .FirstOrDefaultAsync();
        ResetQuery();
        return res;
    }

    public virtual async Task<TEntity?> FindAsync(Expression<Func<TEntity, bool>>? whereExp)
    {
        Expression<Func<TEntity, bool>> exp = e => true;
        whereExp ??= exp;
        TEntity? res = await Queryable.Where(whereExp)
            .AsNoTracking()
            .FirstOrDefaultAsync();
        ResetQuery();
        return res;
    }

    /// <summary>
    /// 条件查询
    /// </summary>
    /// <typeparam name="TDto"></typeparam>
    /// <param name="whereExp"></param>
    /// <returns></returns>
    public virtual async Task<TDto?> FindAsync<TDto>(Expression<Func<TEntity, bool>>? whereExp)
        where TDto : class
    {
        Expression<Func<TEntity, bool>> exp = e => true;
        whereExp ??= exp;
        TDto? res = await Queryable.Where(whereExp)
            .AsNoTracking()
            .ProjectTo<TDto>()
            .FirstOrDefaultAsync();
        ResetQuery();
        return res;
    }

    public virtual async Task<List<TEntity>> ListAsync(Expression<Func<TEntity, bool>>? whereExp)
    {
        Expression<Func<TEntity, bool>> exp = e => true;
        whereExp ??= exp;
        List<TEntity> res = await Queryable.Where(whereExp)
            .AsNoTracking()
            .ToListAsync();
        ResetQuery();
        return res;
    }

    /// <summary>
    /// 列表条件查询
    /// </summary>
    /// <typeparam name="TItem"></typeparam>
    /// <param name="whereExp"></param>
    /// <returns></returns>
    public virtual async Task<List<TItem>> ListAsync<TItem>(Expression<Func<TEntity, bool>>? whereExp)
    {
        Expression<Func<TEntity, bool>> exp = e => true;
        whereExp ??= exp;
        List<TItem> res = await Queryable.Where(whereExp)
            .AsNoTracking()
            .ProjectTo<TItem>()
            .ToListAsync();
        ResetQuery();
        return res;
    }

    /// <summary>
    /// 分页筛选
    /// </summary>
    /// <typeparam name="TItem"></typeparam>
    /// <param name="query"></param>
    /// <param name="pageIndex"></param>
    /// <param name="pageSize"></param>
    /// <returns></returns>
    public virtual async Task<PageList<TItem>> PageListAsync<TItem>(IQueryable<TEntity> query, int pageIndex = 1, int pageSize = 12)
    {
        if (pageIndex < 1)
        {
            pageIndex = 1;
        }

        if (pageSize < 0)
        {
            pageSize = 12;
        }

        Queryable = query;

        var count = Queryable.Count();
        List<TItem> data = await Queryable
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ProjectTo<TItem>()
            .ToListAsync();

        ResetQuery();
        return new PageList<TItem>
        {
            Count = count,
            Data = data,
            PageIndex = pageIndex
        };
    }

    /// <summary>
    /// 分页筛选
    /// </summary>
    /// <typeparam name="TItem"></typeparam>
    /// <param name="query"></param>
    /// <param name="order"></param>
    /// <param name="pageIndex"></param>
    /// <param name="pageSize"></param>
    /// <returns></returns>
    public virtual async Task<PageList<TItem>> FilterAsync<TItem>(IQueryable<TEntity> query, int pageIndex = 1, int pageSize = 12, Dictionary<string, bool>? order = null)
    {

        if (pageIndex < 1)
        {
            pageIndex = 1;
        }

        if (query != null)
        {
            Queryable = query;
        }

        Queryable = order != null ? Queryable.OrderBy(order) : Queryable.OrderByDescending(t => t.CreatedTime);
        var count = Queryable.Count();
        List<TItem> data = await Queryable
            .AsNoTracking()
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ProjectTo<TItem>()
            .ToListAsync();
        ResetQuery();
        return new PageList<TItem>
        {
            Count = count,
            Data = data,
            PageIndex = pageIndex
        };
    }
}
