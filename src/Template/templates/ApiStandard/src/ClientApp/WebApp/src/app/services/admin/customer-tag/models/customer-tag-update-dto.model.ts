/**
 * 用户标签更新时请求结构
 */
export interface CustomerTagUpdateDto {
  /**
   * 显示名称
   */
  displayName?: string | null;
  /**
   * 说明
   */
  description?: string | null;
  /**
   * 唯一标识
   */
  key?: string | null;
  /**
   * 颜色代码:#222222
   */
  colorValue?: string | null;

}
