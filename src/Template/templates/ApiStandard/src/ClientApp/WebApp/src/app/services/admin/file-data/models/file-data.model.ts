import { Folder } from '../../folder/models/folder.model';
/**
 * 文件数据
 */
export interface FileData {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 文件夹
   */
  folder?: Folder | null;
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
  /**
   * 内容
   */
  content: string;

}
