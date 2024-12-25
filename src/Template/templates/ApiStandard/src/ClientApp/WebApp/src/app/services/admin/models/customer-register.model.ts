import { GenderType } from '../enum/models/gender-type.model';
import { AgeRange } from '../enum/models/age-range.model';
import { EnglishLevel } from '../enum/models/english-level.model';
/**
 * 客户登记
 */
export interface CustomerRegister {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 姓名
   */
  name: string;
  gender?: GenderType | null;
  /**
   * 年龄段
   */
  ageRange?: AgeRange | null;
  /**
   * 职业
   */
  occupation: string;
  /**
   * 英语水平
   */
  englishLevel?: EnglishLevel | null;
  /**
   * 学习目标
   */
  learningGoal: string;
  /**
   * 提升部分:听力/口语/阅读/写作
   */
  improveAreas: string[];
  /**
   * 教材倾向:生活/商务/雅思托福
   */
  preferredMaterial: string;
  /**
   * 老师偏好
   */
  teacherPreference: string;
  /**
   * 试听时间
   */
  availableTimes?: string | null;
  /**
   * 上课时间段
   */
  classSchedule?: string | null;
  /**
   * 联系电话
   */
  phoneNumber: string;
  /**
   * 微信号/昵称
   */
  weixin: string;

}
