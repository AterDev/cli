import { CustomerTagItemDto } from '../../customer-tag/models/customer-tag-item-dto.model';
export interface CustomerTagItemDtoPageList {
  count: number;
  data?: CustomerTagItemDto[];
  pageIndex: number;

}
