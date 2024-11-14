import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { CustomerInfoFilterDto } from './models/customer-info-filter-dto.model';
import { CustomerInfoAddDto } from './models/customer-info-add-dto.model';
import { CustomerInfoUpdateDto } from './models/customer-info-update-dto.model';
import { CustomerInfoItemDtoPageList } from './models/customer-info-item-dto-page-list.model';
import { CustomerInfo } from './models/customer-info.model';

/**
 * 客户信息
 */
@Injectable({ providedIn: 'root' })
export class CustomerInfoBaseService extends BaseService {
  /**
   * 筛选
   * @param data CustomerInfoFilterDto
   */
  filter(data: CustomerInfoFilterDto): Observable<CustomerInfoItemDtoPageList> {
    const _url = `/api/admin/CustomerInfo/filter`;
    return this.request<CustomerInfoItemDtoPageList>('post', _url, data);
  }

  /**
   * 新增
   * @param data CustomerInfoAddDto
   */
  add(data: CustomerInfoAddDto): Observable<CustomerInfo> {
    const _url = `/api/admin/CustomerInfo`;
    return this.request<CustomerInfo>('post', _url, data);
  }

  /**
   * 部分更新
   * @param id 
   * @param data CustomerInfoUpdateDto
   */
  update(id: string, data: CustomerInfoUpdateDto): Observable<CustomerInfo> {
    const _url = `/api/admin/CustomerInfo/${id}`;
    return this.request<CustomerInfo>('patch', _url, data);
  }

  /**
   * 详情
   * @param id 
   */
  getDetail(id: string): Observable<CustomerInfo> {
    const _url = `/api/admin/CustomerInfo/${id}`;
    return this.request<CustomerInfo>('get', _url);
  }

  /**
   * ⚠删除
   * @param id 
   */
  delete(id: string): Observable<CustomerInfo> {
    const _url = `/api/admin/CustomerInfo/${id}`;
    return this.request<CustomerInfo>('delete', _url);
  }

}
