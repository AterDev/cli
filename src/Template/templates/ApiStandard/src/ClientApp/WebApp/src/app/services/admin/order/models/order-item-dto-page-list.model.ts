import { OrderItemDto } from '../../order/models/order-item-dto.model';
export interface OrderItemDtoPageList {
  count: number;
  data?: OrderItemDto[];
  pageIndex: number;

}
