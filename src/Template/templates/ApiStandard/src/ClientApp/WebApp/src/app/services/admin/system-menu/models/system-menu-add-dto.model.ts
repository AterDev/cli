import { MenuType } from '../../enum/models/menu-type.model';
/**
 * 系统菜单添加时请求结构
 */
export interface SystemMenuAddDto {
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
  parentId?: string | null;
  /**
   * 是否有效
   */
  isValid: boolean;
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
