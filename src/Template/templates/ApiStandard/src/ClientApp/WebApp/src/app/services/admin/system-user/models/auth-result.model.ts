import { SystemMenu } from '../../system-menu/models/system-menu.model';
import { SystemPermissionGroup } from '../../system-permission-group/models/system-permission-group.model';
export interface AuthResult {
  id: string;
  /**
   * 用户名
   */
  username: string;
  roles: string[];
  menus?: SystemMenu[] | null;
  /**
   * token
   */
  token: string;
  permissionGroups?: SystemPermissionGroup[] | null;

}
