import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { SystemPermissionGroupFilterDto } from './models/system-permission-group-filter-dto.model';
import { SystemPermissionGroupAddDto } from './models/system-permission-group-add-dto.model';
import { SystemPermissionGroupUpdateDto } from './models/system-permission-group-update-dto.model';
import { SystemPermissionGroupItemDtoPageList } from './models/system-permission-group-item-dto-page-list.model';
import { SystemPermissionGroup } from './models/system-permission-group.model';

/**
 * SystemPermissionGroup
 */
@Injectable({ providedIn: 'root' })
export class SystemPermissionGroupBaseService extends BaseService {
  /**
   * 筛选 ✅
   * @param data SystemPermissionGroupFilterDto
   */
  filter(data: SystemPermissionGroupFilterDto): Observable<SystemPermissionGroupItemDtoPageList> {
    const _url = `/api/admin/SystemPermissionGroup/filter`;
    return this.request<SystemPermissionGroupItemDtoPageList>('post', _url, data);
  }

  /**
   * 新增 ✅
   * @param data SystemPermissionGroupAddDto
   */
  add(data: SystemPermissionGroupAddDto): Observable<SystemPermissionGroup> {
    const _url = `/api/admin/SystemPermissionGroup`;
    return this.request<SystemPermissionGroup>('post', _url, data);
  }

  /**
   * 更新 ✅
   * @param id 
   * @param data SystemPermissionGroupUpdateDto
   */
  update(id: string, data: SystemPermissionGroupUpdateDto): Observable<SystemPermissionGroup> {
    const _url = `/api/admin/SystemPermissionGroup/${id}`;
    return this.request<SystemPermissionGroup>('patch', _url, data);
  }

  /**
   * 详情 ✅
   * @param id 
   */
  getDetail(id: string): Observable<SystemPermissionGroup> {
    const _url = `/api/admin/SystemPermissionGroup/${id}`;
    return this.request<SystemPermissionGroup>('get', _url);
  }

  /**
   * ⚠删除 ✅
   * @param id 
   */
  delete(id: string): Observable<SystemPermissionGroup> {
    const _url = `/api/admin/SystemPermissionGroup/${id}`;
    return this.request<SystemPermissionGroup>('delete', _url);
  }

}
