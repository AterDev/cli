import { ProductType } from '../../enum/models/product-type.model';
import { ProductStatus } from '../../enum/models/product-status.model';
import { Order } from '../../order/models/order.model';
/**
 * 产品
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
   * 排序
   */
  sort: number;
  /**
   * 产品类型
   */
  productType?: ProductType | null;
  /**
   * 产品状态
   */
  status?: ProductStatus | null;
  /**
   * 原价
   */
  originPrice: number;
  /**
   * 用量
   */
  dosage?: number | null;
  /**
   * 账号数量
   */
  accountNumber: number;
  orders?: Order[];

}
