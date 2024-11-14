import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { SystemPermissionFilterDto } from './models/system-permission-filter-dto.model';
import { SystemPermissionAddDto } from './models/system-permission-add-dto.model';
import { SystemPermissionUpdateDto } from './models/system-permission-update-dto.model';
import { SystemPermissionItemDtoPageList } from './models/system-permission-item-dto-page-list.model';
import { SystemPermission } from './models/system-permission.model';

/**
 * 权限
 */
@Injectable({ providedIn: 'root' })
export class SystemPermissionBaseService extends BaseService {
  /**
   * 筛选 ✅
   * @param data SystemPermissionFilterDto
   */
  filter(data: SystemPermissionFilterDto): Observable<SystemPermissionItemDtoPageList> {
    const _url = `/api/admin/SystemPermission/filter`;
    return this.request<SystemPermissionItemDtoPageList>('post', _url, data);
  }

  /**
   * 新增 ✅
   * @param data SystemPermissionAddDto
   */
  add(data: SystemPermissionAddDto): Observable<SystemPermission> {
    const _url = `/api/admin/SystemPermission`;
    return this.request<SystemPermission>('post', _url, data);
  }

  /**
   * 更新 ✅
   * @param id 
   * @param data SystemPermissionUpdateDto
   */
  update(id: string, data: SystemPermissionUpdateDto): Observable<SystemPermission> {
    const _url = `/api/admin/SystemPermission/${id}`;
    return this.request<SystemPermission>('patch', _url, data);
  }

  /**
   * 详情 ✅
   * @param id 
   */
  getDetail(id: string): Observable<SystemPermission> {
    const _url = `/api/admin/SystemPermission/${id}`;
    return this.request<SystemPermission>('get', _url);
  }

  /**
   * ⚠删除 ✅
   * @param id 
   */
  delete(id: string): Observable<SystemPermission> {
    const _url = `/api/admin/SystemPermission/${id}`;
    return this.request<SystemPermission>('delete', _url);
  }

}
