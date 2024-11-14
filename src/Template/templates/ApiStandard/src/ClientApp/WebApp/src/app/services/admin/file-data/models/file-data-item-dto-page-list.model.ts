import { FileDataItemDto } from '../../file-data/models/file-data-item-dto.model';
export interface FileDataItemDtoPageList {
  count: number;
  data?: FileDataItemDto[];
  pageIndex: number;

}
