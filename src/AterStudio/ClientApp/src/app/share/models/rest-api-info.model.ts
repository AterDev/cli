import { OperationType } from './enum/operation-type.model';
import { PropertyInfo } from './property-info.model';
import { EntityInfo } from './entity-info.model';
/**
 * 接口信息
 */
export interface RestApiInfo {
  operationType?: OperationType | null;
  /**
   * 路由
   */
  router: string;
  /**
   * 说明
   */
  summary?: string | null;
  tag?: string | null;
  operationId: string;
  /**
   * 请求查询参数
   */
  queryParameters?: PropertyInfo[] | null;
  /**
   * 实体
   */
  requestInfo?: EntityInfo | null;
  /**
   * 实体
   */
  responseInfo?: EntityInfo | null;

}
