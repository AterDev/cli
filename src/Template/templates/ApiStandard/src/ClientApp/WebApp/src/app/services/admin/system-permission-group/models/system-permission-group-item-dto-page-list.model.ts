import { SystemPermissionGroupItemDto } from '../../system-permission-group/models/system-permission-group-item-dto.model';
export interface SystemPermissionGroupItemDtoPageList {
  count: number;
  data?: SystemPermissionGroupItemDto[];
  pageIndex: number;

}
