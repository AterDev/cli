import { Injectable } from '@angular/core';
import { DataImportBaseService } from './data-import-base.service';

/**
 * 用户账户
 */
@Injectable({providedIn: 'root' })
export class DataImportService extends DataImportBaseService {
  id: string | null = null;
  name: string | null = null;
}