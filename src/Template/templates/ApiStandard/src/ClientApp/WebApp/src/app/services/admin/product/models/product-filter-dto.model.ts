import { ProductType } from '../../enum/models/product-type.model';
import { ProductStatus } from '../../enum/models/product-status.model';
/**
 * 产品筛选条件
 */
export interface ProductFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 名称
   */
  name?: string | null;
  /**
   * 价格
   */
  price?: number | null;
  /**
   * 排序
   */
  sort?: number | null;
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
  originPrice?: number | null;
  /**
   * 用量
   */
  dosage?: number | null;
  /**
   * 账号数量
   */
  accountNumber?: number | null;

}
