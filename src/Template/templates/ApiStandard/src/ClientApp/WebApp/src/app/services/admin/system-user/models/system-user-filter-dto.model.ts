/**
 * 系统用户查询筛选
 */
export interface SystemUserFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 用户名
   */
  userName?: string | null;
  /**
   * 真实姓名
   */
  realName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  /**
   * 角色id
   */
  roleId?: string | null;
  roleName?: string | null;

}
