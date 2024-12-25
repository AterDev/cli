import { CustomerInfo } from '../customer-info/models/customer-info.model';
import { CustomerType } from '../enum/models/customer-type.model';
import { Product } from '../models/product.model';
import { OrderStatus } from '../enum/models/order-status.model';
/**
 * 订单
 */
export interface Order {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 是否续费
   */
  isRenewal: boolean;
  /**
   * 客户信息
   */
  customerInfo?: CustomerInfo | null;
  customerInfoId: string;
  /**
   * 课时数
   */
  lessonCount: number;
  /**
   * 老师名称
   */
  teacherName?: string | null;
  /**
   * 上课时间描述
   */
  teachTimeDescription?: string | null;
  /**
   * 付款方式
   */
  payMethod?: string | null;
  /**
   * 付款渠道
   */
  payChannel?: string | null;
  /**
   * 下单来源
   */
  orderSource?: string | null;
  /**
   * 下单时间
   */
  orderTime: Date;
  /**
   * 有效期:天
   */
  validPeriod: number;
  /**
   * 备注图片
   */
  remarkImage?: string | null;
  /**
   * 客户类型
   */
  customerType?: CustomerType | null;
  /**
   * 订单编号
   */
  orderNumber: string;
  /**
   * 支付订单号
   */
  payNumber?: string | null;
  /**
   * 商品
   */
  product?: Product | null;
  productId: string;
  /**
   * 产品名称
   */
  productName: string;
  /**
   * 产品详细信息
   */
  productDetail?: string | null;
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
   * 备注
   */
  remark?: string | null;
  /**
   * 订单状态
   */
  status?: OrderStatus | null;

}
