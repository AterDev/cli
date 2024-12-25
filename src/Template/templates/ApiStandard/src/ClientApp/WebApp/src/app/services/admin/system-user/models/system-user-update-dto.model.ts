import { GenderType } from '../../enum/models/gender-type.model';
/**
 * 系统用户更新时请求结构
 */
export interface SystemUserUpdateDto {
  /**
   * 用户名
   */
  userName: string;
  /**
   * 密码
   */
  password?: string | null;
  /**
   * 真实姓名
   */
  realName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  /**
   * 头像url
   */
  avatar?: string | null;
  sex?: GenderType | null;
  /**
   * 角色Id
   */
  roleIds?: string[] | null;

}
