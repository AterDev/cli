import { FileType } from '../../enum/models/file-type.model';
/**
 * 文件数据查询筛选
 */
export interface FileDataFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 文件名
   */
  fileName?: string | null;
  /**
   * 文件类型
   */
  fileType?: FileType | null;
  /**
   * md5值
   */
  md5?: string | null;
  folderId?: string | null;

}
