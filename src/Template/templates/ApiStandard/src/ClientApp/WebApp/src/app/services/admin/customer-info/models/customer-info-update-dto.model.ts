import { GenderType } from '../../enum/models/gender-type.model';
import { AdditionProperty } from '../../models/addition-property.model';
/**
 * 客户信息更新时请求结构
 */
export interface CustomerInfoUpdateDto {
  /**
   * 真实姓名
   */
  realName?: string | null;
  /**
   * 生日
   */
  birthDay?: Date | null;
  genderType?: GenderType | null;
  /**
   * 地址
   */
  address?: string | null;
  /**
   * 说明备注
   */
  remark?: string | null;
  /**
   * 联系信息
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
  customerAccountId?: string | null;
  customerTagsIds?: string[] | null;

}
