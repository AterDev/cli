import { CustomerAccountLevel } from '../enum/models/customer-account-level.model';
import { CustomerInfo } from '../customer-info/models/customer-info.model';
/**
 * 客户账号
 */
export interface CustomerAccount {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 密码
   */
  passwordHash: string;
  /**
   * 密码加盐
   */
  passwordSalt: string;
  /**
   * 客户等级
   */
  accountLevel?: CustomerAccountLevel | null;
  /**
   * 介绍
   */
  description?: string | null;
  /**
   * 登录手机
   */
  phone?: string | null;
  /**
   * 登录邮箱
   */
  email?: string | null;
  /**
   * 客户信息
   */
  customerInfo?: CustomerInfo | null;

}
