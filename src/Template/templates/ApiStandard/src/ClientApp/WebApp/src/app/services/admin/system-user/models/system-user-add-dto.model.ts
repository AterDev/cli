import { GenderType } from '../../enum/models/gender-type.model';
/**
 * 系统用户添加时请求结构
 */
export interface SystemUserAddDto {
  /**
   * 用户名
   */
  userName: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 真实姓名
   */
  realName?: string | null;
  /**
   * 邮箱
   */
  email?: string | null;
  /**
   * 手机号
   */
  phoneNumber?: string | null;
  /**
   * 头像 url
   */
  avatar?: string | null;
  sex?: GenderType | null;
  /**
   * 角色id
   */
  roleIds?: string[] | null;

}
