import { GenderType } from '../../enum/models/gender-type.model';
import { CustomerType } from '../../enum/models/customer-type.model';
import { FollowUpStatus } from '../../enum/models/follow-up-status.model';
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
  /**
   * 联系信息
   */
  contactInfo?: string | null;
  /**
   * 客户类型
   */
  customerType?: CustomerType | null;
  /**
   * 客户跟进状态
   */
  followUpStatus?: FollowUpStatus | null;

}
