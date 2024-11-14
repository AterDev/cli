using Application;

using Entity.OrderMod;

using OrderMod.Managers;
using OrderMod.Models.OrderDtos;
namespace OrderMod.Controllers;

/// <summary>
/// 订单
/// </summary>
/// <see cref="Managers.OrderManager"/>
public class OrderController(
    IUserContext user,
    ILogger<OrderController> logger,
    OrderManager manager) : ClientControllerBase<OrderManager>(manager, user, logger)
{

    /// <summary>
    /// 订单列表 ✅
    /// </summary>
    /// <param name="filter"></param>
    /// <returns></returns>
    [HttpPost("filter")]
    public async Task<ActionResult<PageList<OrderItemDto>>> FilterAsync(OrderFilterDto filter)
    {
        filter.UserId = _user.UserId;
        return await _manager.ToPageAsync(filter);
    }

    /// <summary>
    /// 详情 ✅
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<Order?>> GetDetailAsync([FromRoute] Guid id)
    {
        Order? res = await _manager.FindAsync(id);
        return (res == null) ? NotFound() : res;
    }
}