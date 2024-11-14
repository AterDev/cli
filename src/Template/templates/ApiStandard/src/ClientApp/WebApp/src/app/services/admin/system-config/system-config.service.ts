import { Injectable } from '@angular/core';
import { SystemConfigBaseService } from './system-config-base.service';

/**
 * 系统配置
 */
@Injectable({providedIn: 'root' })
export class SystemConfigService extends SystemConfigBaseService {
  id: string | null = null;
  name: string | null = null;
}