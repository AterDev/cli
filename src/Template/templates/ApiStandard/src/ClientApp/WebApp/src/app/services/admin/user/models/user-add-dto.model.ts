import { UserType } from '../../enum/models/user-type.model';
/**
 * 用户账户添加时请求结构
 */
export interface UserAddDto {
  /**
   * 用户名
   */
  userName: string;
  userType?: UserType | null;
  password: string;
  /**
   * 邮箱
   */
  email?: string | null;
  phoneNumber?: string | null;
  /**
   * 头像url
   */
  avatar?: string | null;

}
