/**
 * 菜单更新
 */
export interface SystemRoleSetPermissionGroupsDto {
  /**
   * 角色Id
   */
  id: string;
  /**
   * 菜单Id集合
   */
  permissionGroupIds: string[];

}
