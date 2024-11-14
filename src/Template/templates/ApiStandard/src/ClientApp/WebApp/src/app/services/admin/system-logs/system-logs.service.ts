import { Injectable } from '@angular/core';
import { SystemLogsBaseService } from './system-logs-base.service';

/**
 * 系统日志
 */
@Injectable({providedIn: 'root' })
export class SystemLogsService extends SystemLogsBaseService {
  id: string | null = null;
  name: string | null = null;
}