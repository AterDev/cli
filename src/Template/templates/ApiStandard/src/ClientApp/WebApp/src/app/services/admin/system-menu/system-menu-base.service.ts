import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { SystemMenuFilterDto } from './models/system-menu-filter-dto.model';
import { SystemMenuAddDto } from './models/system-menu-add-dto.model';
import { SystemMenuUpdateDto } from './models/system-menu-update-dto.model';
import { SystemMenuPageList } from './models/system-menu-page-list.model';
import { SystemMenu } from './models/system-menu.model';

/**
 * 系统菜单
 */
@Injectable({ providedIn: 'root' })
export class SystemMenuBaseService extends BaseService {
  /**
   * 筛选 ✅
   * @param data SystemMenuFilterDto
   */
  filter(data: SystemMenuFilterDto): Observable<SystemMenuPageList> {
    const _url = `/api/admin/SystemMenu/filter`;
    return this.request<SystemMenuPageList>('post', _url, data);
  }

  /**
   * 新增 ✅
   * @param data SystemMenuAddDto
   */
  add(data: SystemMenuAddDto): Observable<SystemMenu> {
    const _url = `/api/admin/SystemMenu`;
    return this.request<SystemMenu>('post', _url, data);
  }

  /**
   * 更新 ✅
   * @param id 
   * @param data SystemMenuUpdateDto
   */
  update(id: string, data: SystemMenuUpdateDto): Observable<SystemMenu> {
    const _url = `/api/admin/SystemMenu/${id}`;
    return this.request<SystemMenu>('patch', _url, data);
  }

  /**
   * ⚠删除 ✅
   * @param id 
   */
  delete(id: string): Observable<SystemMenu> {
    const _url = `/api/admin/SystemMenu/${id}`;
    return this.request<SystemMenu>('delete', _url);
  }

}
