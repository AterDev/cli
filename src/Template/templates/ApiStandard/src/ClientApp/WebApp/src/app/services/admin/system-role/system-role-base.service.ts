import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { SystemRoleFilterDto } from './models/system-role-filter-dto.model';
import { SystemRoleAddDto } from './models/system-role-add-dto.model';
import { SystemRoleUpdateDto } from './models/system-role-update-dto.model';
import { SystemRoleSetMenusDto } from './models/system-role-set-menus-dto.model';
import { SystemRoleSetPermissionGroupsDto } from './models/system-role-set-permission-groups-dto.model';
import { SystemRoleItemDtoPageList } from './models/system-role-item-dto-page-list.model';
import { SystemRole } from './models/system-role.model';

/**
 * 系统角色
SystemMod.Manager.SystemRoleManager
 */
@Injectable({ providedIn: 'root' })
export class SystemRoleBaseService extends BaseService {
  /**
   * 筛选 ✅
   * @param data SystemRoleFilterDto
   */
  filter(data: SystemRoleFilterDto): Observable<SystemRoleItemDtoPageList> {
    const _url = `/api/admin/SystemRole/filter`;
    return this.request<SystemRoleItemDtoPageList>('post', _url, data);
  }

  /**
   * 新增 ✅
   * @param data SystemRoleAddDto
   */
  add(data: SystemRoleAddDto): Observable<SystemRole> {
    const _url = `/api/admin/SystemRole`;
    return this.request<SystemRole>('post', _url, data);
  }

  /**
   * 更新 ✅
   * @param id 
   * @param data SystemRoleUpdateDto
   */
  update(id: string, data: SystemRoleUpdateDto): Observable<SystemRole> {
    const _url = `/api/admin/SystemRole/${id}`;
    return this.request<SystemRole>('patch', _url, data);
  }

  /**
   * 详情 ✅
   * @param id 
   */
  getDetail(id: string): Observable<SystemRole> {
    const _url = `/api/admin/SystemRole/${id}`;
    return this.request<SystemRole>('get', _url);
  }

  /**
   * ⚠删除 ✅
   * @param id 
   */
  delete(id: string): Observable<SystemRole> {
    const _url = `/api/admin/SystemRole/${id}`;
    return this.request<SystemRole>('delete', _url);
  }

  /**
   * 角色菜单 ✅
   * @param data SystemRoleSetMenusDto
   */
  updateMenus(data: SystemRoleSetMenusDto): Observable<SystemRole> {
    const _url = `/api/admin/SystemRole/menus`;
    return this.request<SystemRole>('put', _url, data);
  }

  /**
   * Set Permission Group ✅
   * @param data SystemRoleSetPermissionGroupsDto
   */
  updatePermissionGroups(data: SystemRoleSetPermissionGroupsDto): Observable<SystemRole> {
    const _url = `/api/admin/SystemRole/permissionGroups`;
    return this.request<SystemRole>('put', _url, data);
  }

}
