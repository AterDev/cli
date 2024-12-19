import { CustomerInfo } from '../customer-info/models/customer-info.model';
import { TeamRight } from '../models/team-right.model';
import { TeamStatus } from '../enum/models/team-status.model';
import { TeamType } from '../enum/models/team-type.model';
export interface Team {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 团队名称
   */
  name: string;
  customers?: CustomerInfo[];
  /**
   * 团队权益
   */
  teamRight?: TeamRight | null;
  status?: TeamStatus | null;
  teamType?: TeamType | null;

}
