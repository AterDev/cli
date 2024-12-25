import { PermissionType } from '../../enum/models/permission-type.model';
/**
 * 权限更新时请求结构
 */
export interface SystemPermissionUpdateDto {
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
  enable?: boolean | null;
  /**
   * 权限类型
   */
  permissionType?: PermissionType | null;
  systemPermissionGroupId?: string | null;

}
