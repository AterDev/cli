import { UserType } from '../../enum/models/user-type.model';
/**
 * 用户账户查询筛选
 */
export interface UserFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 用户名
   */
  userName?: string | null;
  userType?: UserType | null;
  /**
   * 邮箱
   */
  email?: string | null;
  emailConfirmed?: boolean | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean | null;

}
