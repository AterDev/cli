import { SystemUserItemDto } from '../../system-user/models/system-user-item-dto.model';
export interface SystemUserItemDtoPageList {
  count: number;
  data?: SystemUserItemDto[];
  pageIndex: number;

}
