import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { SystemLogsFilterDto } from './models/system-logs-filter-dto.model';
import { SystemLogsItemDtoPageList } from './models/system-logs-item-dto-page-list.model';

/**
 * 系统日志
 */
@Injectable({ providedIn: 'root' })
export class SystemLogsBaseService extends BaseService {
  /**
   * 筛选 ✅
   * @param data SystemLogsFilterDto
   */
  filter(data: SystemLogsFilterDto): Observable<SystemLogsItemDtoPageList> {
    const _url = `/api/admin/SystemLogs/filter`;
    return this.request<SystemLogsItemDtoPageList>('post', _url, data);
  }

}
