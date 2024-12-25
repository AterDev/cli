import { ProductType } from '../enum/models/product-type.model';
import { Order } from '../models/order.model';
/**
 * 商品
 */
export interface Product {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string | null;
  /**
   * 价格
   */
  price: number;
  /**
   * 积分兑换
   */
  costScore: number;
  /**
   * 排序
   */
  sort: number;
  /**
   * 有效期：天
   */
  days: number;
  /**
   * 产品类型
   */
  productType?: ProductType | null;
  /**
   * 原价
   */
  originPrice: number;
  orders?: Order[];

}
