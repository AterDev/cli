import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { UserFilterDto } from './models/user-filter-dto.model';
import { UserAddDto } from './models/user-add-dto.model';
import { UserUpdateDto } from './models/user-update-dto.model';
import { UserItemDtoPageList } from './models/user-item-dto-page-list.model';
import { User } from './models/user.model';

/**
 * 用户账户
 */
@Injectable({ providedIn: 'root' })
export class UserBaseService extends BaseService {
  /**
   * 筛选 ✅
   * @param data UserFilterDto
   */
  filter(data: UserFilterDto): Observable<UserItemDtoPageList> {
    const _url = `/api/admin/User/filter`;
    return this.request<UserItemDtoPageList>('post', _url, data);
  }

  /**
   * 新增 ✅
   * @param data UserAddDto
   */
  add(data: UserAddDto): Observable<User> {
    const _url = `/api/admin/User`;
    return this.request<User>('post', _url, data);
  }

  /**
   * 更新 ✅
   * @param id 
   * @param data UserUpdateDto
   */
  update(id: string, data: UserUpdateDto): Observable<User> {
    const _url = `/api/admin/User/${id}`;
    return this.request<User>('patch', _url, data);
  }

  /**
   * 详情 ✅
   * @param id 
   */
  getDetail(id: string): Observable<User> {
    const _url = `/api/admin/User/${id}`;
    return this.request<User>('get', _url);
  }

  /**
   * ⚠删除 ✅
   * @param id 
   */
  delete(id: string): Observable<User> {
    const _url = `/api/admin/User/${id}`;
    return this.request<User>('delete', _url);
  }

}
