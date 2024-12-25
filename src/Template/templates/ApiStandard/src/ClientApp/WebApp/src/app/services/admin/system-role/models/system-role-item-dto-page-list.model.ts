import { SystemRoleItemDto } from '../../system-role/models/system-role-item-dto.model';
export interface SystemRoleItemDtoPageList {
  count: number;
  data?: SystemRoleItemDto[];
  pageIndex: number;

}
