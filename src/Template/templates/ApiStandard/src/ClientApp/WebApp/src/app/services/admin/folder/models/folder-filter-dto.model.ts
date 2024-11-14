/**
 * 文件夹查询筛选
 */
export interface FolderFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 名称
   */
  name?: string | null;
  parentId?: string | null;

}
