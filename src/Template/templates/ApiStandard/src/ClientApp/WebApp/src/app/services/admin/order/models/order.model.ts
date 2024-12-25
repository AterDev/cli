import { CustomerInfo } from '../../customer-info/models/customer-info.model';
import { Product } from '../../product/models/product.model';
import { OrderStatus } from '../../enum/models/order-status.model';
/**
 * 订单
 */
export interface Order {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 客户信息
   */
  customerInfo?: CustomerInfo | null;
  customerInfoId: string;
  /**
   * 订单编号
   */
  orderNumber: string;
  /**
   * 支付订单号
   */
  payNumber?: string | null;
  /**
   * 产品
   */
  product?: Product | null;
  productId: string;
  /**
   * 产品名称
   */
  productName: string;
  /**
   * 原价格
   */
  originPrice: number;
  /**
   * 支付价格
   */
  totalPrice: number;
  /**
   * 优惠码
   */
  discountCode?: string | null;
  /**
   * 订单状态
   */
  status?: OrderStatus | null;

}
