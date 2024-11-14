import { FileData } from '../../file-data/models/file-data.model';
/**
 * 文件夹
 */
export interface Folder {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 名称
   */
  name: string;
  /**
   * 文件夹
   */
  parent?: Folder | null;
  parentId?: string | null;
  children?: Folder[];
  /**
   * 路径
   */
  path?: string | null;
  files?: FileData[];

}
