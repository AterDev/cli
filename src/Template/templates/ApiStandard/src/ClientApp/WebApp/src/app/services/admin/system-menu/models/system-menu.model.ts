import { SystemRole } from '../../system-role/models/system-role.model';
import { MenuType } from '../../enum/models/menu-type.model';
/**
 * 系统菜单
 */
export interface SystemMenu {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 菜单名称
   */
  name: string;
  /**
   * 菜单路径
   */
  path?: string | null;
  /**
   * 图标
   */
  icon?: string | null;
  /**
   * 系统菜单
   */
  parent?: SystemMenu | null;
  parentId?: string | null;
  /**
   * 是否有效
   */
  isValid: boolean;
  /**
   * 子菜单
   */
  children?: SystemMenu[];
  /**
   * 所属角色
   */
  roles?: SystemRole[];
  /**
   * 权限编码
   */
  accessCode: string;
  menuType?: MenuType | null;
  /**
   * 排序
   */
  sort: number;
  /**
   * 是否显示
   */
  hidden: boolean;

}
