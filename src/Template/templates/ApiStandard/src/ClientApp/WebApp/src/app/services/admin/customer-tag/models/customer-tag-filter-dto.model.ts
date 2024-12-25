/**
 * 用户标签查询筛选
 */
export interface CustomerTagFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 显示名称
   */
  displayName?: string | null;
  /**
   * 唯一标识
   */
  key?: string | null;

}
