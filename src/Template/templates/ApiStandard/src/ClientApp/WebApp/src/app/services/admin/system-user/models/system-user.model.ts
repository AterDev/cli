import { SystemRole } from '../../system-role/models/system-role.model';
import { SystemLogs } from '../../system-logs/models/system-logs.model';
import { SystemOrganization } from '../../models/system-organization.model';
import { Sex } from '../../enum/models/sex.model';
/**
 * 系统用户
 */
export interface SystemUser {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 真实姓名
   */
  realName?: string | null;
  email?: string | null;
  emailConfirmed: boolean;
  phoneNumber?: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: Date | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  /**
   * 最后登录时间
   */
  lastLoginTime?: Date | null;
  /**
   * 最后密码修改时间
   */
  lastPwdEditTime: Date;
  /**
   * 密码重试次数
   */
  retryCount: number;
  /**
   * 头像url
   */
  avatar?: string | null;
  systemRoles?: SystemRole[];
  systemLogs?: SystemLogs[];
  systemOrganizations?: SystemOrganization[];
  /**
   * 性别
   */
  sex?: Sex | null;

}
