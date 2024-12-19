/**
 * 系统配置概要
 */
export interface SystemConfigDetailDto {
  key: string;
  description?: string | null;
  valid: boolean;
  /**
   * 是否属于系统配置
   */
  isSystem: boolean;
  /**
   * 组
   */
  groupName?: string | null;

}
