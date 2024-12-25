import { PermissionType } from '../../enum/models/permission-type.model';
/**
 * 权限列表元素
 */
export interface SystemPermissionItemDto {
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

}
