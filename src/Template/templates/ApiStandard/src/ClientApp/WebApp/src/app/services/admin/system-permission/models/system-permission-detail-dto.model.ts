import { PermissionType } from '../../enum/models/permission-type.model';
import { SystemPermissionGroup } from '../../system-permission-group/models/system-permission-group.model';
/**
 * 权限概要
 */
export interface SystemPermissionDetailDto {
  id: string;
  /**
   * 权限名称标识
   */
  name: string;
  /**
   * 权限说明
   */
  description?: string | null;
  /**
   * 是否启用
   */
  enable: boolean;
  /**
   * 权限类型
   */
  permissionType?: PermissionType | null;
  /**
   * 系统权限组
   */
  group?: SystemPermissionGroup | null;

}
