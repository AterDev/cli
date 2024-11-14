import { Injectable } from '@angular/core';
import { SystemRoleBaseService } from './system-role-base.service';

/**
 * 系统角色
SystemMod.Manager.SystemRoleManager
 */
@Injectable({providedIn: 'root' })
export class SystemRoleService extends SystemRoleBaseService {
  id: string | null = null;
  name: string | null = null;
}