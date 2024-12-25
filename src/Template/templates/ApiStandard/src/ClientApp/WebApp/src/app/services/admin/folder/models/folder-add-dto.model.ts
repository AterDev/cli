/**
 * 文件夹添加时请求结构
 */
export interface FolderAddDto {
  /**
   * 名称
   */
  name: string;
  parentId?: string | null;

}
