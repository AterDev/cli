import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { SystemConfigFilterDto } from './models/system-config-filter-dto.model';
import { SystemConfigAddDto } from './models/system-config-add-dto.model';
import { SystemConfigUpdateDto } from './models/system-config-update-dto.model';
import { SystemConfigItemDtoPageList } from './models/system-config-item-dto-page-list.model';
import { EnumDictionary } from './models/enum-dictionary.model';
import { SystemConfig } from './models/system-config.model';

/**
 * 系统配置
 */
@Injectable({ providedIn: 'root' })
export class SystemConfigBaseService extends BaseService {
  /**
   * 获取配置列表 ✅
   * @param data SystemConfigFilterDto
   */
  filter(data: SystemConfigFilterDto): Observable<SystemConfigItemDtoPageList> {
    const _url = `/api/admin/SystemConfig/filter`;
    return this.request<SystemConfigItemDtoPageList>('post', _url, data);
  }

  /**
   * 获取枚举信息 ✅
   */
  getEnumConfigs(): Observable<Map<string, EnumDictionary[]>> {
    const _url = `/api/admin/SystemConfig/enum`;
    return this.request<Map<string, EnumDictionary[]>>('get', _url);
  }

  /**
   * 新增 ✅
   * @param data SystemConfigAddDto
   */
  add(data: SystemConfigAddDto): Observable<SystemConfig> {
    const _url = `/api/admin/SystemConfig`;
    return this.request<SystemConfig>('post', _url, data);
  }

  /**
   * 更新 ✅
   * @param id 
   * @param data SystemConfigUpdateDto
   */
  update(id: string, data: SystemConfigUpdateDto): Observable<SystemConfig> {
    const _url = `/api/admin/SystemConfig/${id}`;
    return this.request<SystemConfig>('patch', _url, data);
  }

  /**
   * 详情 ✅
   * @param id 
   */
  getDetail(id: string): Observable<SystemConfig> {
    const _url = `/api/admin/SystemConfig/${id}`;
    return this.request<SystemConfig>('get', _url);
  }

  /**
   * ⚠删除 ✅
   * @param id 
   */
  delete(id: string): Observable<SystemConfig> {
    const _url = `/api/admin/SystemConfig/${id}`;
    return this.request<SystemConfig>('delete', _url);
  }

}
