import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { CustomerTagFilterDto } from './models/customer-tag-filter-dto.model';
import { CustomerTagAddDto } from './models/customer-tag-add-dto.model';
import { CustomerTagUpdateDto } from './models/customer-tag-update-dto.model';
import { CustomerTagItemDtoPageList } from './models/customer-tag-item-dto-page-list.model';
import { CustomerTag } from './models/customer-tag.model';

/**
 * 用户标签
 */
@Injectable({ providedIn: 'root' })
export class CustomerTagBaseService extends BaseService {
  /**
   * 筛选
   * @param data CustomerTagFilterDto
   */
  filter(data: CustomerTagFilterDto): Observable<CustomerTagItemDtoPageList> {
    const _url = `/api/admin/CustomerTag/filter`;
    return this.request<CustomerTagItemDtoPageList>('post', _url, data);
  }

  /**
   * 新增
   * @param data CustomerTagAddDto
   */
  add(data: CustomerTagAddDto): Observable<CustomerTag> {
    const _url = `/api/admin/CustomerTag`;
    return this.request<CustomerTag>('post', _url, data);
  }

  /**
   * 部分更新
   * @param id 
   * @param data CustomerTagUpdateDto
   */
  update(id: string, data: CustomerTagUpdateDto): Observable<CustomerTag> {
    const _url = `/api/admin/CustomerTag/${id}`;
    return this.request<CustomerTag>('patch', _url, data);
  }

  /**
   * 详情
   * @param id 
   */
  getDetail(id: string): Observable<CustomerTag> {
    const _url = `/api/admin/CustomerTag/${id}`;
    return this.request<CustomerTag>('get', _url);
  }

  /**
   * ⚠删除
   * @param id 
   */
  delete(id: string): Observable<CustomerTag> {
    const _url = `/api/admin/CustomerTag/${id}`;
    return this.request<CustomerTag>('delete', _url);
  }

}
