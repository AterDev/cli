import { SystemPermission } from '../../system-permission/models/system-permission.model';
export interface SystemPermissionGroupItemDto {
  id: string;
  /**
   * 权限名称标识
   */
  name: string;
  /**
   * 权限说明
   */
  description?: string | null;
  permissions?: SystemPermission[] | null;

}
