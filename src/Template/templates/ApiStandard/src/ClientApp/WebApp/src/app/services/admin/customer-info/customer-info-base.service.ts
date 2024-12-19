import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { CustomerInfoFilterDto } from './models/customer-info-filter-dto.model';
import { CustomerInfoAddDto } from './models/customer-info-add-dto.model';
import { CustomerInfoUpdateDto } from './models/customer-info-update-dto.model';
import { CustomerInfoItemDtoPageList } from './models/customer-info-item-dto-page-list.model';
import { CustomerInfoDetailDto } from './models/customer-info-detail-dto.model';

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
  add(data: CustomerInfoAddDto): Observable<string> {
    const _url = `/api/admin/CustomerInfo`;
    return this.request<string>('post', _url, data);
  }

  /**
   * 部分更新
   * @param id 
   * @param data CustomerInfoUpdateDto
   */
  update(id: string, data: CustomerInfoUpdateDto): Observable<boolean> {
    const _url = `/api/admin/CustomerInfo/${id}`;
    return this.request<boolean>('patch', _url, data);
  }

  /**
   * 详情
   * @param id 
   */
  getDetail(id: string): Observable<CustomerInfoDetailDto> {
    const _url = `/api/admin/CustomerInfo/${id}`;
    return this.request<CustomerInfoDetailDto>('get', _url);
  }

  /**
   * ⚠删除
   * @param id 
   */
  delete(id: string): Observable<boolean> {
    const _url = `/api/admin/CustomerInfo/${id}`;
    return this.request<boolean>('delete', _url);
  }

  /**
   * 修改密码 ✅
   * @param password string
   * @param newPassword string
   */
  changePassword(password: string | null, newPassword: string | null): Observable<boolean> {
    const _url = `/api/admin/CustomerInfo/changePassword?password=${password ?? ''}&newPassword=${newPassword ?? ''}`;
    return this.request<boolean>('put', _url);
  }

}
