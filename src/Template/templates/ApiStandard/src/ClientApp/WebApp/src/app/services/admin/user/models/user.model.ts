import { UserType } from '../../enum/models/user-type.model';
/**
 * 用户账户
 */
export interface User {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 用户名
   */
  userName: string;
  userType?: UserType | null;
  /**
   * 邮箱
   */
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
   * 密码重试次数
   */
  retryCount: number;
  /**
   * 头像url
   */
  avatar?: string | null;

}
