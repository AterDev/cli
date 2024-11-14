import { ProductType } from '../../enum/models/product-type.model';
/**
 * 产品列表元素
 */
export interface ProductItemDto {
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
   * 原价
   */
  originPrice: number;
  /**
   * 积分兑换
   */
  costScore: number;
  /**
   * 有效期：天
   */
  days: number;
  /**
   * 产品类型
   */
  productType?: ProductType | null;
  id: string;
  createdTime: Date;

}
