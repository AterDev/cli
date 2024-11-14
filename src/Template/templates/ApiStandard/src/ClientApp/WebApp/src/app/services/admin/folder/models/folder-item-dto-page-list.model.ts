import { FolderItemDto } from '../../folder/models/folder-item-dto.model';
export interface FolderItemDtoPageList {
  count: number;
  data?: FolderItemDto[];
  pageIndex: number;

}
