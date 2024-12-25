import { GenderType } from '../../enum/models/gender-type.model';
import { CustomerStatus } from '../../enum/models/customer-status.model';
import { TeamRight } from '../../models/team-right.model';
import { Team } from '../../models/team.model';
/**
 * 客户信息概要
 */
export interface CustomerInfoDetailDto {
  id: string;
  /**
   * 真实姓名
   */
  userName: string;
  /**
   * 生日
   */
  birthDay?: Date | null;
  genderType?: GenderType | null;
  /**
   * 客户类型
   */
  status?: CustomerStatus | null;
  /**
   * 团队权益
   */
  teamRight?: TeamRight | null;
  remark: string;
  team?: Team | null;

}
