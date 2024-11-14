import { CustomerInfoItemDto } from '../../customer-info/models/customer-info-item-dto.model';
export interface CustomerInfoItemDtoPageList {
  count: number;
  data?: CustomerInfoItemDto[];
  pageIndex: number;

}
