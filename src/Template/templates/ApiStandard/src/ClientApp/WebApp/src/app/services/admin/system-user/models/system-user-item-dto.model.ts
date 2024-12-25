import { GenderType } from '../../enum/models/gender-type.model';
/**
 * 系统用户列表元素
 */
export interface SystemUserItemDto {
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
   * 密码重试次数
   */
  retryCount: number;
  /**
   * 头像url
   */
  avatar?: string | null;
  sex?: GenderType | null;
  id: string;
  createdTime: Date;
  updatedTime: Date;

}
