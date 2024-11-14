import { OrderStatus } from '../../enum/models/order-status.model';
/**
 * 订单更新时请求结构
 */
export interface OrderUpdateDto {
  /**
   * 订单状态
   */
  status?: OrderStatus | null;

}
