import { UserType } from '../../enum/models/user-type.model';
/**
 * 用户账户更新时请求结构
 */
export interface UserUpdateDto {
  userType?: UserType | null;
  password?: string | null;
  email?: string | null;
  /**
   * 头像url
   */
  avatar?: string | null;

}
