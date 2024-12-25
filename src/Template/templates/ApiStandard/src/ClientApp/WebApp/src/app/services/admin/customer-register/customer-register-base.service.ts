import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { CustomerRegisterFilterDto } from './models/customer-register-filter-dto.model';
import { CustomerRegisterAddDto } from './models/customer-register-add-dto.model';
import { CustomerRegisterItemDtoPageList } from './models/customer-register-item-dto-page-list.model';
import { CustomerRegister } from './models/customer-register.model';

/**
 * 客户登记
 */
@Injectable({ providedIn: 'root' })
export class CustomerRegisterBaseService extends BaseService {
  /**
   * 筛选
   * @param data CustomerRegisterFilterDto
   */
  filter(data: CustomerRegisterFilterDto): Observable<CustomerRegisterItemDtoPageList> {
    const _url = `/api/admin/CustomerRegister/filter`;
    return this.request<CustomerRegisterItemDtoPageList>('post', _url, data);
  }

  /**
   * 新增
   * @param data CustomerRegisterAddDto
   */
  add(data: CustomerRegisterAddDto): Observable<CustomerRegister> {
    const _url = `/api/admin/CustomerRegister`;
    return this.request<CustomerRegister>('post', _url, data);
  }

  /**
   * 详情
   * @param id 
   */
  getDetail(id: string): Observable<CustomerRegister> {
    const _url = `/api/admin/CustomerRegister/${id}`;
    return this.request<CustomerRegister>('get', _url);
  }

  /**
   * ⚠删除
   * @param id 
   */
  delete(id: string): Observable<CustomerRegister> {
    const _url = `/api/admin/CustomerRegister/${id}`;
    return this.request<CustomerRegister>('delete', _url);
  }

  /**
   * 获取临时码
   */
  getTempCode(): Observable<string> {
    const _url = `/api/admin/CustomerRegister/temp_code`;
    return this.request<string>('get', _url);
  }

  /**
   * 验证临时码
   * @param code string
   */
  verifyTempCode(code: string | null): Observable<boolean> {
    const _url = `/api/admin/CustomerRegister/verify_temp_code?code=${code ?? ''}`;
    return this.request<boolean>('get', _url);
  }

}
