import { ProductType } from '../../enum/models/product-type.model';
/**
 * 产品更新时请求结构
 */
export interface ProductUpdateDto {
  /**
   * 名称
   */
  name?: string | null;
  /**
   * 描述
   */
  description?: string | null;
  /**
   * 排序
   */
  sort: number;
  /**
   * 价格
   */
  price?: number | null;
  /**
   * 原价
   */
  originPrice?: number | null;
  /**
   * 积分兑换
   */
  costScore?: number | null;
  /**
   * 有效期：天
   */
  days?: number | null;
  /**
   * 产品类型
   */
  productType?: ProductType | null;

}
