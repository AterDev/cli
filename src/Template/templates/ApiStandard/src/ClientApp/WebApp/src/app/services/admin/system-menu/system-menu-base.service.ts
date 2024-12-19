import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { SystemMenuFilterDto } from './models/system-menu-filter-dto.model';
import { SystemMenuAddDto } from './models/system-menu-add-dto.model';
import { SystemMenuUpdateDto } from './models/system-menu-update-dto.model';
import { SystemMenuPageList } from './models/system-menu-page-list.model';

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
  add(data: SystemMenuAddDto): Observable<string> {
    const _url = `/api/admin/SystemMenu`;
    return this.request<string>('post', _url, data);
  }

  /**
   * 更新 ✅
   * @param id 
   * @param data SystemMenuUpdateDto
   */
  update(id: string, data: SystemMenuUpdateDto): Observable<boolean> {
    const _url = `/api/admin/SystemMenu/${id}`;
    return this.request<boolean>('patch', _url, data);
  }

  /**
   * ⚠删除 ✅
   * @param id 
   */
  delete(id: string): Observable<boolean> {
    const _url = `/api/admin/SystemMenu/${id}`;
    return this.request<boolean>('delete', _url);
  }

}
