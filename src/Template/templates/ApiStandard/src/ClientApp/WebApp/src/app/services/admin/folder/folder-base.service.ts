import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { FolderFilterDto } from './models/folder-filter-dto.model';
import { FolderAddDto } from './models/folder-add-dto.model';
import { FolderItemDtoPageList } from './models/folder-item-dto-page-list.model';
import { Folder } from './models/folder.model';

/**
 * 文件夹
 */
@Injectable({ providedIn: 'root' })
export class FolderBaseService extends BaseService {
  /**
   * 筛选 ✅
   * @param data FolderFilterDto
   */
  filter(data: FolderFilterDto): Observable<FolderItemDtoPageList> {
    const _url = `/api/admin/Folder/filter`;
    return this.request<FolderItemDtoPageList>('post', _url, data);
  }

  /**
   * 新增 ✅
   * @param data FolderAddDto
   */
  add(data: FolderAddDto): Observable<Folder> {
    const _url = `/api/admin/Folder`;
    return this.request<Folder>('post', _url, data);
  }

  /**
   * 详情 ✅
   * @param id 
   */
  getDetail(id: string): Observable<Folder> {
    const _url = `/api/admin/Folder/${id}`;
    return this.request<Folder>('get', _url);
  }

  /**
   * ⚠删除 ✅
   * @param id 
   */
  delete(id: string): Observable<Folder> {
    const _url = `/api/admin/Folder/${id}`;
    return this.request<Folder>('delete', _url);
  }

}
