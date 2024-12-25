/**
 * 角色查询筛选
 */
export interface SystemRoleFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 角色显示名称
   */
  name?: string | null;
  /**
   * 角色名，系统标识
   */
  nameValue?: string | null;

}
