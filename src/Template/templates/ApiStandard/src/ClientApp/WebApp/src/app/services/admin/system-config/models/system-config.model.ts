/**
 * 系统配置
 */
export interface SystemConfig {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  key: string;
  /**
   * 以json字符串形式存储
   */
  value: string;
  description?: string | null;
  valid: boolean;
  /**
   * 是否属于系统配置
   */
  isSystem: boolean;
  /**
   * 组
   */
  groupName: string;

}
