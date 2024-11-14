import { Injectable } from '@angular/core';
import { SystemPermissionGroupBaseService } from './system-permission-group-base.service';

/**
 * SystemPermissionGroup
 */
@Injectable({providedIn: 'root' })
export class SystemPermissionGroupService extends SystemPermissionGroupBaseService {
  id: string | null = null;
  name: string | null = null;
}