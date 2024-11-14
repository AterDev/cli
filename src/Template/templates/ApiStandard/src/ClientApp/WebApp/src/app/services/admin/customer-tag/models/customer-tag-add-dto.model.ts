/**
 * 用户标签添加时请求结构
 */
export interface CustomerTagAddDto {
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

}
