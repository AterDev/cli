import { GenderType } from '../../enum/models/gender-type.model';
import { CustomerType } from '../../enum/models/customer-type.model';
import { FollowUpStatus } from '../../enum/models/follow-up-status.model';
/**
 * 客户信息列表元素
 */
export interface CustomerInfoItemDto {
  /**
   * 真实姓名
   */
  realName?: string | null;
  name: string;
  /**
   * 生日
   */
  birthDay?: Date | null;
  /**
   * 年龄
   */
  age: number;
  genderType?: GenderType | null;
  /**
   * 客户类型
   */
  customerType?: CustomerType | null;
  /**
   * 客户跟进状态
   */
  followUpStatus?: FollowUpStatus | null;
  /**
   * 联系信息
   */
  contactInfo?: string | null;
  id: string;
  createdTime: Date;

}
