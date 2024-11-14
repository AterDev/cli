import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { OrderFilterDto } from './models/order-filter-dto.model';
import { OrderUpdateDto } from './models/order-update-dto.model';
import { OrderItemDtoPageList } from './models/order-item-dto-page-list.model';
import { Order } from './models/order.model';

/**
 * 订单
 */
@Injectable({ providedIn: 'root' })
export class OrderBaseService extends BaseService {
  /**
   * 筛选 ✅
   * @param data OrderFilterDto
   */
  filter(data: OrderFilterDto): Observable<OrderItemDtoPageList> {
    const _url = `/api/admin/Order/filter`;
    return this.request<OrderItemDtoPageList>('post', _url, data);
  }

  /**
   * 更新订单状态 ✅
   * @param id 
   * @param data OrderUpdateDto
   */
  update(id: string, data: OrderUpdateDto): Observable<Order> {
    const _url = `/api/admin/Order/${id}`;
    return this.request<Order>('patch', _url, data);
  }

  /**
   * 详情 ✅
   * @param id 
   */
  getDetail(id: string): Observable<Order> {
    const _url = `/api/admin/Order/${id}`;
    return this.request<Order>('get', _url);
  }

}
