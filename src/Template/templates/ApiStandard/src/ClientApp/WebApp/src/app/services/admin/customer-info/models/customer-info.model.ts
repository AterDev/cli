import { CustomerLessonRecord } from '../../models/customer-lesson-record.model';
import { TrialRecord } from '../../models/trial-record.model';
import { Order } from '../../order/models/order.model';
import { CertificateType } from '../../enum/models/certificate-type.model';
import { SystemUser } from '../../system-user/models/system-user.model';
import { GenderType } from '../../enum/models/gender-type.model';
import { CustomerType } from '../../enum/models/customer-type.model';
import { FollowUpStatus } from '../../enum/models/follow-up-status.model';
import { AdditionProperty } from '../../models/addition-property.model';
import { CustomerAccount } from '../../models/customer-account.model';
import { CustomerRegister } from '../../customer-register/models/customer-register.model';
import { CustomerTag } from '../../customer-tag/models/customer-tag.model';
import { CustomerInfoTag } from '../../models/customer-info-tag.model';
/**
 * 客户信息
 */
export interface CustomerInfo {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 课时操作记录
   */
  lessonRecords?: CustomerLessonRecord[];
  /**
   * 试用记录
   */
  trialRecords?: TrialRecord[];
  /**
   * 订单
   */
  orders?: Order[];
  /**
   * 是否成人
   */
  isAdult: boolean;
  /**
   * 证书类型
   */
  certificateType?: CertificateType | null;
  /**
   * 总课时数
   */
  totalLessonCount: number;
  /**
   * 剩余课时数
   */
  remainingLessonCount: number;
  /**
   * 系统用户
   */
  createdUser?: SystemUser | null;
  createdUserId: string;
  /**
   * 系统用户
   */
  manager?: SystemUser | null;
  managerId: string;
  /**
   * 姓名/真实姓名
   */
  name: string;
  /**
   * 唯一编号
   */
  numbering: string;
  /**
   * 真实姓名
   */
  realName?: string | null;
  /**
   * 生日
   */
  birthDay?: Date | null;
  /**
   * 年龄
   */
  age: number;
  genderType?: GenderType | null;
  /**
   * 客户类型
   */
  customerType?: CustomerType | null;
  /**
   * 客户跟进状态
   */
  followUpStatus?: FollowUpStatus | null;
  /**
   * 客户来源
   */
  source?: string | null;
  /**
   * 地址
   */
  address?: string | null;
  /**
   * 说明备注
   */
  remark?: string | null;
  /**
   * 联系信息，微信号
   */
  contactInfo?: string | null;
  /**
   * 联系电话
   */
  contactPhone?: string | null;
  /**
   * 联系邮箱
   */
  contactEmail?: string | null;
  /**
   * 自定义信息
   */
  additionProperties?: AdditionProperty[] | null;
  /**
   * 客户账号
   */
  customerAccount?: CustomerAccount | null;
  customerAccountId?: string | null;
  /**
   * 客户登记
   */
  customerRegister?: CustomerRegister | null;
  customerRegisterId?: string | null;
  /**
   * 标签
   */
  tags?: CustomerTag[] | null;
  customerInfoTags?: CustomerInfoTag[] | null;

}
