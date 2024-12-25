import { CustomerInfo } from '../customer-info/models/customer-info.model';
import { SystemUser } from '../system-user/models/system-user.model';
import { Order } from '../order/models/order.model';
/**
 * 试用记录
 */
export interface TrialRecord {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 关联客户id
   */
  customerInfoId: string;
  /**
   * 客户信息
   */
  customerInfo?: CustomerInfo | null;
  /**
   * 关联顾问id
   */
  systemUserId: string;
  /**
   * 系统用户
   */
  systemUser?: SystemUser | null;
  /**
   * 订单
   */
  order?: Order | null;
  orderId: string;
  /**
   * 学员名称
   */
  customerName: string;
  /**
   * 授课老师姓名
   */
  teacherName: string;
  /**
   * 教材名称
   */
  teachingMaterials: string;
  /**
   * 试听时间
   */
  trialTime?: Date | null;
  /**
   * 备注
   */
  remark?: string | null;
  /**
   * 课程顾问姓名
   */
  consultantName: string;

}
