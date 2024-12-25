/**
 * 系统菜单查询筛选，参数为空时，返回所有菜单树型结构
 */
export interface SystemMenuFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 只显示该层级下菜单
   */
  parentId?: string | null;
  /**
   * 角色id
   */
  roleId?: string | null;

}
