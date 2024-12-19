import { GenderType } from '../../enum/models/gender-type.model';
import { CustomerStatus } from '../../enum/models/customer-status.model';
import { Team } from '../../models/team.model';
/**
 * 客户信息列表元素
 */
export interface CustomerInfoItemDto {
  /**
   * 用户名
   */
  userName: string;
  genderType?: GenderType | null;
  id: string;
  /**
   * 客户类型
   */
  status?: CustomerStatus | null;
  createdTime: Date;
  team?: Team | null;

}
