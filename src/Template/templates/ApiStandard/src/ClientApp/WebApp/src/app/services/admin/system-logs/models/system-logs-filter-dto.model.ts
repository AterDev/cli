import { UserActionType } from '../../enum/models/user-action-type.model';
/**
 * 系统日志查询筛选
 */
export interface SystemLogsFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 操作人名称
   */
  actionUserName?: string | null;
  /**
   * 操作对象名称
   */
  targetName?: string | null;
  actionType?: UserActionType | null;
  /**
   * 开始时间
   */
  startDate?: string | null;
  /**
   * 结束时间
   */
  endDate?: string | null;

}
