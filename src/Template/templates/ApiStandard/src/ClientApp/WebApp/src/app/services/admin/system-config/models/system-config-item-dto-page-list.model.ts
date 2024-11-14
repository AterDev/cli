import { SystemConfigItemDto } from '../../system-config/models/system-config-item-dto.model';
export interface SystemConfigItemDtoPageList {
  count: number;
  data?: SystemConfigItemDto[];
  pageIndex: number;

}
