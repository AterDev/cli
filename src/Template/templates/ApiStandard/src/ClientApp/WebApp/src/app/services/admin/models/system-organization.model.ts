import { SystemUser } from '../system-user/models/system-user.model';
/**
 * 组织结构
 */
export interface SystemOrganization {
  id: string;
  createdTime: Date;
  updatedTime: Date;
  isDeleted: boolean;
  /**
   * 名称
   */
  name: string;
  /**
   * 子目录
   */
  children?: SystemOrganization[];
  /**
   * 组织结构
   */
  parent?: SystemOrganization | null;
  parentId?: string | null;
  users?: SystemUser[];

}
