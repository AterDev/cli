/**
 * 文件数据列表元素
 */
export interface FileDataItemDto {
  /**
   * 文件名
   */
  fileName: string;
  /**
   * 扩展名
   */
  extension?: string | null;
  /**
   * md5值
   */
  md5: string;
  id: string;
  /**
   * 创建时间
   */
  createdTime: Date;
  /**
   * 图片内容
   */
  content?: string | null;

}
