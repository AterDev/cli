import { CustomerInfo } from '../../customer-info/models/customer-info.model';
import { CustomerInfoTag } from '../../models/customer-info-tag.model';
/**
 * 用户标签
 */
export interface CustomerTag {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 显示名称
   */
  displayName: string;
  /**
   * 说明
   */
  description?: string | null;
  /**
   * 唯一标识
   */
  key: string;
  /**
   * 颜色代码:#222222
   */
  colorValue?: string | null;
  customers?: CustomerInfo[];
  customerInfoTags?: CustomerInfoTag[];

}
