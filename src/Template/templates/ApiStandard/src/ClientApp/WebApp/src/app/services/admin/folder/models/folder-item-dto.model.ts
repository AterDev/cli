/**
 * 文件夹列表元素
 */
export interface FolderItemDto {
  /**
   * 名称
   */
  name: string;
  parentId?: string | null;
  /**
   * 路径
   */
  path?: string | null;
  id: string;
  /**
   * 创建时间
   */
  createdTime: Date;

}
