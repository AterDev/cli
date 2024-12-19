import { CustomerStatus } from '../../enum/models/customer-status.model';
/**
 * 客户信息更新时请求结构
 */
export interface CustomerInfoUpdateDto {
  /**
   * 备注
   */
  remark?: string | null;
  /**
   * 客户类型
   */
  status?: CustomerStatus | null;
  password?: string | null;

}
