import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { FileDataFilterDto } from './models/file-data-filter-dto.model';
import { FileDataItemDtoPageList } from './models/file-data-item-dto-page-list.model';
import { FileData } from './models/file-data.model';

/**
 * 文件数据
 */
@Injectable({ providedIn: 'root' })
export class FileDataBaseService extends BaseService {
  /**
   * 筛选 ✅
   * @param data FileDataFilterDto
   */
  filter(data: FileDataFilterDto): Observable<FileDataItemDtoPageList> {
    const _url = `/api/admin/FileData/filter`;
    return this.request<FileDataItemDtoPageList>('post', _url, data);
  }

  /**
   * 上传 ✅
   * @param folderId string
   * @param data any
   */
  add(folderId: string | null, data: any): Observable<number> {
    const _url = `/api/admin/FileData?folderId=${folderId ?? ''}`;
    return this.request<number>('post', _url, data);
  }

  /**
   * 上传文件
   * @param path 
   * @param data FormData
   */
  upload(path: string | null, data: FormData): Observable<string> {
    const _url = `/api/admin/FileData/upload?path=${path ?? ''}`;
    return this.request<string>('post', _url, data);
  }

  /**
   * 详情 ✅
   * @param id 
   */
  getDetail(id: string): Observable<FileData> {
    const _url = `/api/admin/FileData/${id}`;
    return this.request<FileData>('get', _url);
  }

  /**
   * ⚠删除 ✅
   * @param id 
   */
  delete(id: string): Observable<FileData> {
    const _url = `/api/admin/FileData/${id}`;
    return this.request<FileData>('delete', _url);
  }

}
