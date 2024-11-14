import { ProductItemDto } from '../../product/models/product-item-dto.model';
export interface ProductItemDtoPageList {
  count: number;
  data?: ProductItemDto[];
  pageIndex: number;

}
