using Ater.Web.Abstraction.Interface;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Ater.Web.Abstraction.EntityFramework;
/// <summary>
/// 读写仓储基类,请勿直接修改基类内容 
/// </summary>
/// <typeparam name="TContext"></typeparam>
/// <typeparam name="TEntity"></typeparam>
public class CommandSet<TContent, TEntity>(TContent commandDbContext) : ICommandStore<TEntity>, ICommandStoreExt<TEntity>
    where TContent : DbContext
    where TEntity : class, IEntityBase
{
    private readonly TContent _commandDbContext = commandDbContext;
    /// <summary>
    /// 当前实体DbSet
    /// </summary>
    protected readonly DbSet<TEntity> _db = commandDbContext.Set<TEntity>();
    public DbSet<TEntity> Db => _db;

    public DatabaseFacade Database { get; init; } = commandDbContext.Database;
    public bool EnableSoftDelete { get; set; } = true;

    public virtual async Task<int> SaveChangesAsync()
    {
        return await _commandDbContext.SaveChangesAsync();
    }

    public virtual async Task<TEntity?> FindAsync(Expression<Func<TEntity, bool>>? whereExp, string[]? navigations = null)
    {
        Expression<Func<TEntity, bool>> exp = e => true;
        whereExp ??= exp;
        IQueryable<TEntity> _query = _db.Where(whereExp).AsQueryable();
        if (navigations != null)
        {
            foreach (var item in navigations)
            {
                _query = _query.Include(item);
            }
        }
        return await _query.FirstOrDefaultAsync();
    }

    /// <summary>
    /// 列表条件查询
    /// </summary>
    /// <param name="whereExp"></param>
    /// <returns></returns>
    public virtual async Task<List<TEntity>> ListAsync(Expression<Func<TEntity, bool>>? whereExp = null)
    {
        Expression<Func<TEntity, bool>> exp = e => true;
        whereExp ??= exp;
        List<TEntity> res = await _db.Where(whereExp)
            .ToListAsync();
        return res;
    }

    /// <summary>
    /// 创建实体
    /// </summary>
    /// <param name="entity"></param>
    /// <returns></returns>
    public virtual async Task<TEntity> CreateAsync(TEntity entity)
    {
        _ = await _db.AddAsync(entity);
        return entity;
    }

    /// <summary>
    /// 更新实体
    /// </summary>
    /// <param name="entity"></param>
    /// <returns></returns>
    public virtual TEntity Update(TEntity entity)
    {
        _ = _db.Update(entity);
        return entity;
    }

    /// <summary>
    /// 移除实体,若未找到，返回null
    /// </summary>
    /// <param name="entity"></param>
    /// <returns></returns>
    public virtual TEntity? Remove(TEntity entity)
    {
        if (EnableSoftDelete)
        {
            entity.IsDeleted = true;
            _db.Entry(entity).Property(e => e.IsDeleted).IsModified = true;
        }
        else
        {
            _ = _db.Remove(entity!);
        }
        return entity;
    }

    /// <summary>
    /// 移除实体
    /// </summary>
    /// <param name="entities"></param>
    public virtual void RemoveRange(List<TEntity> entities)
    {
        if (EnableSoftDelete)
        {
            foreach (TEntity entity in entities)
            {
                entity.IsDeleted = true;
            }
        }
        else
        {
            _db.RemoveRange(entities);
        }
    }

    /// <summary>
    /// 批量创建
    /// </summary>
    /// <param name="entities"></param>
    /// <param name="chunk">每个批次的最大数量</param>
    /// <returns></returns>
    public virtual async Task<List<TEntity>> CreateRangeAsync(List<TEntity> entities, int? chunk = 50)
    {
        if (chunk != null && entities.Count > chunk)
        {

            entities.Chunk((entities.Count / chunk.Value) + 1).ToList()
                .ForEach(block =>
                {
                    _db.AddRange(block);
                    _ = _commandDbContext.SaveChanges();
                });
        }
        else
        {
            await _db.AddRangeAsync(entities);
            _ = await SaveChangesAsync();
        }
        return entities;
    }

    /// <summary>
    /// 条件更新
    /// </summary>
    /// <typeparam name="TUpdate"></typeparam>
    /// <param name="whereExp"></param>
    /// <param name="dto"></param>
    /// <returns></returns>
    [Obsolete("Not Implement")]
    public virtual Task<int> UpdateRangeAsync<TUpdate>(Expression<Func<TEntity, bool>> whereExp, TUpdate dto)
    {
        //return await _db.Where(whereExp).ExecuteUpdateAsync(d => d.SetProperty(d => d.Id, d => Guid.NewGuid()));
        throw new NotImplementedException();
    }

    /// <summary>
    /// 批量删除
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    public virtual async Task<int> DeleteRangeAsync(List<Guid> ids)
    {
        return await _db.Where(d => ids.Contains(d.Id)).ExecuteDeleteAsync();
    }

    /// <summary>
    /// 条件删除
    /// </summary>
    /// <param name="whereExp"></param>
    /// <returns></returns>
    public virtual async Task<int> DeleteRangeAsync(Expression<Func<TEntity, bool>> whereExp)
    {
        return await _db.Where(whereExp).ExecuteDeleteAsync();
    }

    /// <summary>
    /// 附加实体
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="entities"></param>
    public virtual void AttachRange<T>(List<T> entities) where T : IEntityBase
    {
        _commandDbContext.AttachRange(entities);
    }

    public List<T> CreateAttachInstance<T>(List<Guid> ids) where T : class, IEntityBase
    {
        List<T> res = [];
        Type type = typeof(T);
        foreach (Guid id in ids)
        {
            var instance = Activator.CreateInstance(type);
            if (instance != null)
            {
                var entity = instance as T;
                entity!.Id = id;
                res.Add(entity);
            }
        }
        return res;
    }
}
