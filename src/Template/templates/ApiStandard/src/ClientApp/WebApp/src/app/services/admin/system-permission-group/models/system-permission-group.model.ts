import { SystemPermission } from '../../system-permission/models/system-permission.model';
import { SystemRole } from '../../system-role/models/system-role.model';
/**
 * 系统权限组
 */
export interface SystemPermissionGroup {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 权限名称标识
   */
  name: string;
  /**
   * 权限说明
   */
  description?: string | null;
  permissions?: SystemPermission[];
  roles?: SystemRole[];

}
