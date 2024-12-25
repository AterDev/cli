import { CustomerInfo } from '../customer-info/models/customer-info.model';
import { LessonRecordType } from '../enum/models/lesson-record-type.model';
/**
 * 课时记录
 */
export interface CustomerLessonRecord {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 客户信息
   */
  customerInfo?: CustomerInfo | null;
  customerInfoId: string;
  /**
   * 课时操作类型
   */
  recordType?: LessonRecordType | null;
  /**
   * 说明
   */
  description: string;
  /**
   * 变化数量
   */
  changeCount: number;
  /**
   * 总课时数
   */
  totalLessonCount: number;
  /**
   * 剩余课时数
   */
  remainingLessonCount: number;

}
