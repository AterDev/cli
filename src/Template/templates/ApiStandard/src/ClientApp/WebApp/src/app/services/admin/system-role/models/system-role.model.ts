import { SystemUser } from '../../system-user/models/system-user.model';
import { SystemPermissionGroup } from '../../system-permission-group/models/system-permission-group.model';
import { SystemMenu } from '../../system-menu/models/system-menu.model';
/**
 * 系统角色
 */
export interface SystemRole {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 角色显示名称
   */
  name: string;
  /**
   * 角色名，系统标识
   */
  nameValue: string;
  /**
   * 是否系统内置,系统内置不可删除
   */
  isSystem: boolean;
  /**
   * 图标
   */
  icon?: string | null;
  users?: SystemUser[];
  /**
   * 中间表
   */
  permissionGroups?: SystemPermissionGroup[];
  /**
   * 菜单权限
   */
  menus?: SystemMenu[];

}
