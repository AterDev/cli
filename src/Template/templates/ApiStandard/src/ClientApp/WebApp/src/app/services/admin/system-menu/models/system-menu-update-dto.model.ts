import { MenuType } from '../../enum/models/menu-type.model';
/**
 * 系统菜单更新时请求结构
 */
export interface SystemMenuUpdateDto {
  /**
   * 菜单名称
   */
  name?: string | null;
  /**
   * 菜单路径
   */
  path?: string | null;
  /**
   * 图标
   */
  icon?: string | null;
  /**
   * 是否有效
   */
  isValid?: boolean | null;
  /**
   * 权限编码
   */
  accessCode: string;
  menuType?: MenuType | null;
  /**
   * 排序
   */
  sort?: number | null;
  /**
   * 是否显示
   */
  hidden?: boolean | null;

}
