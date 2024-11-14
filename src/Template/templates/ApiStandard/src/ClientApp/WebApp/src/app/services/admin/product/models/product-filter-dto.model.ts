import { ProductType } from '../../enum/models/product-type.model';
/**
 * 产品查询筛选
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
   * 产品类型
   */
  productType?: ProductType | null;

}
