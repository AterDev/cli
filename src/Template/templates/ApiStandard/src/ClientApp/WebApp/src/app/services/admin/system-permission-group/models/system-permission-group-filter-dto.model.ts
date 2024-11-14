export interface SystemPermissionGroupFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 权限名称标识
   */
  name?: string | null;

}
