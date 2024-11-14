import { CustomerType } from '../../enum/models/customer-type.model';
import { GenderType } from '../../enum/models/gender-type.model';
/**
 * 客户信息添加时请求结构
 */
export interface CustomerInfoAddDto {
  /**
   * 真实姓名
   */
  realName?: string | null;
  /**
   * 名称
   */
  name: string;
  /**
   * 编号
   */
  numbering?: string | null;
  /**
   * 客户类型
   */
  customerType?: CustomerType | null;
  /**
   * 客户来源
   */
  source?: string | null;
  genderType?: GenderType | null;
  /**
   * 说明备注
   */
  remark?: string | null;
  /**
   * 微信联系
   */
  contactInfo: string;
  /**
   * 联系电话
   */
  contactPhone?: string | null;
  /**
   * 联系邮箱
   */
  contactEmail?: string | null;
  /**
   * 顾问id
   */
  consultantId: string;

}
