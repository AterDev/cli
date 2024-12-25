import { Injectable } from '@angular/core';
import { SystemMenuBaseService } from './system-menu-base.service';

/**
 * 系统菜单
 */
@Injectable({providedIn: 'root' })
export class SystemMenuService extends SystemMenuBaseService {
  id: string | null = null;
  name: string | null = null;
}