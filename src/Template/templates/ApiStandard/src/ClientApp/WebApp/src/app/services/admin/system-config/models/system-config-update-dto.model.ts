/**
 * 系统配置更新时请求结构
 */
export interface SystemConfigUpdateDto {
  key?: string | null;
  /**
   * 以json字符串形式存储
   */
  value?: string | null;
  description?: string | null;
  valid?: boolean | null;
  /**
   * 分组
   */
  groupName?: string | null;

}
