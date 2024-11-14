import { UserItemDto } from '../../user/models/user-item-dto.model';
export interface UserItemDtoPageList {
  count: number;
  data?: UserItemDto[];
  pageIndex: number;

}
