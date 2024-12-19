import { GenderType } from '../../enum/models/gender-type.model';
/**
 * 客户信息查询筛选
 */
export interface CustomerInfoFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 姓名
   */
  searchKey?: string | null;
  genderType?: GenderType | null;

}
