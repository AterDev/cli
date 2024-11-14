import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

/**
 * 用户账户
 */
@Injectable({ providedIn: 'root' })
export class DataImportBaseService extends BaseService {
  /**
   * 导入试用数据
   * @param data FormData
   */
  importTrialData(data: FormData): Observable<string> {
    const _url = `/api/admin/DataImport/trial`;
    return this.request<string>('post', _url, data);
  }

  /**
   * 导入正式数据
   * @param data FormData
   */
  importFormalData(data: FormData): Observable<string> {
    const _url = `/api/admin/DataImport/formal`;
    return this.request<string>('post', _url, data);
  }

}
