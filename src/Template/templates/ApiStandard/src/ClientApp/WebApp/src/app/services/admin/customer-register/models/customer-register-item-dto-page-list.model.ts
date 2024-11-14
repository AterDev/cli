import { CustomerRegisterItemDto } from '../../customer-register/models/customer-register-item-dto.model';
export interface CustomerRegisterItemDtoPageList {
  count: number;
  data?: CustomerRegisterItemDto[];
  pageIndex: number;

}
