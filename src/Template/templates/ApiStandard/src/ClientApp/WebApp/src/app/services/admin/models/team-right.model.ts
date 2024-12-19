import { Team } from '../models/team.model';
/**
 * 团队权益
 */
export interface TeamRight {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  team?: Team | null;
  teamId: string;
  /**
   * 用量
   */
  dosage?: number | null;
  /**
   * 是否限制有效期
   */
  isRestrictionPeriod: boolean;
  /**
   * 开始时间
   */
  startTime?: Date | null;
  /**
   * 结束时间
   */
  endTime?: Date | null;
  /**
   * 账号数量
   */
  accountNumber: number;

}
