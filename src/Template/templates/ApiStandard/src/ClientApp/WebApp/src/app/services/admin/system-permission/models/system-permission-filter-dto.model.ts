import { PermissionType } from '../../enum/models/permission-type.model';
/**
 * 权限查询筛选
 */
export interface SystemPermissionFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 权限名称标识
   */
  name?: string | null;
  /**
   * 权限类型
   */
  permissionType?: PermissionType | null;
  groupId?: string | null;

}
