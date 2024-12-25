import { SystemPermissionItemDto } from '../../system-permission/models/system-permission-item-dto.model';
export interface SystemPermissionItemDtoPageList {
  count: number;
  data?: SystemPermissionItemDto[];
  pageIndex: number;

}
