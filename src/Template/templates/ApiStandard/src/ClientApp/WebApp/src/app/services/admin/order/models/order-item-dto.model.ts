import { OrderStatus } from '../../enum/models/order-status.model';
/**
 * 订单列表元素
 */
export interface OrderItemDto {
  /**
   * 订单编号
   */
  orderNumber: string;
  /**
   * 订单的总价格。
   */
  totalPrice: number;
  /**
   * 原价格
   */
  originPrice: number;
  /**
   * 订单状态
   */
  status?: OrderStatus | null;
  id: string;
  createdTime: Date;

}
