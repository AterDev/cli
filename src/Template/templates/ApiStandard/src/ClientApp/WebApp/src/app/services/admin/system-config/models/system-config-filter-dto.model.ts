/**
 * 系统配置查询筛选
 */
export interface SystemConfigFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  key?: string | null;
  /**
   * 组
   */
  groupName?: string | null;

}
