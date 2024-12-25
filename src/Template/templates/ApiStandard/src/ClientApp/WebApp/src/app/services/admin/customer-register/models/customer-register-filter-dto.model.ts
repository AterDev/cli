import { GenderType } from '../../enum/models/gender-type.model';
import { AgeRange } from '../../enum/models/age-range.model';
import { EnglishLevel } from '../../enum/models/english-level.model';
/**
 * 客户登记查询筛选
 */
export interface CustomerRegisterFilterDto {
  pageIndex: number;
  pageSize: number;
  orderBy?: any | null;
  /**
   * 姓名
   */
  name?: string | null;
  gender?: GenderType | null;
  /**
   * 年龄段
   */
  ageRange?: AgeRange | null;
  /**
   * 英语水平
   */
  englishLevel?: EnglishLevel | null;
  /**
   * 联系电话
   */
  phoneNumber?: string | null;
  /**
   * 微信号/昵称
   */
  weixin?: string | null;

}
