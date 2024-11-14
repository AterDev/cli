import { UserActionType } from '../../enum/models/user-action-type.model';
import { SystemUser } from '../../system-user/models/system-user.model';
/**
 * 系统日志
 */
export interface SystemLogs {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 操作人名称
   */
  actionUserName: string;
  /**
   * 操作对象名称
   */
  targetName: string;
  /**
   * 操作路由
   */
  route: string;
  actionType?: UserActionType | null;
  /**
   * 描述
   */
  description?: string | null;
  /**
   * 系统用户
   */
  systemUser?: SystemUser | null;
  systemUserId: string;

}
