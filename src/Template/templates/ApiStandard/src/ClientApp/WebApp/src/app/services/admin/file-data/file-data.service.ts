import { Injectable } from '@angular/core';
import { FileDataBaseService } from './file-data-base.service';

/**
 * 文件数据
 */
@Injectable({providedIn: 'root' })
export class FileDataService extends FileDataBaseService {
  id: string | null = null;
  name: string | null = null;
}