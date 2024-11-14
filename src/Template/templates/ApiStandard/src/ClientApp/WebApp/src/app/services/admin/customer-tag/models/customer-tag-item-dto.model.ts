/**
 * 用户标签列表元素
 */
export interface CustomerTagItemDto {
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
  id: string;
  createdTime: Date;

}
