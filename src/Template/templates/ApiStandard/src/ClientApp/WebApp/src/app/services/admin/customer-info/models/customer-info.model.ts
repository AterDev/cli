import { Team } from '../../models/team.model';
import { GenderType } from '../../enum/models/gender-type.model';
import { CustomerStatus } from '../../enum/models/customer-status.model';
/**
 * 客户信息
 */
export interface CustomerInfo {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  team?: Team | null;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 头像url
   */
  avatar?: string | null;
  /**
   * 真实姓名
   */
  realName?: string | null;
  /**
   * 备注
   */
  remark?: string | null;
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
  status?: CustomerStatus | null;

}
