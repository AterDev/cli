import { OrderStatus } from '../../enum/models/order-status.model';
/**
 * 订单查询筛选
 */
export interface OrderFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 订单编号
   */
  orderNumber?: string | null;
  /**
   * 订单状态
   */
  status?: OrderStatus | null;
  productId?: string | null;
  userId?: string | null;

}
