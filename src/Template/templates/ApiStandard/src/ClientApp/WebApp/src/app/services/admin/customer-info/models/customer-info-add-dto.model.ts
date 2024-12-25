import { TeamType } from '../../enum/models/team-type.model';
import { GenderType } from '../../enum/models/gender-type.model';
/**
 * 客户信息添加时请求结构
 */
export interface CustomerInfoAddDto {
  /**
   * 用户名
   */
  userName: string;
  teamType?: TeamType | null;
  /**
   * 密码
   */
  password?: string | null;
  genderType?: GenderType | null;
  /**
   * 说明备注
   */
  remark?: string | null;
  /**
   * 团队id
   */
  teamId?: string | null;

}
