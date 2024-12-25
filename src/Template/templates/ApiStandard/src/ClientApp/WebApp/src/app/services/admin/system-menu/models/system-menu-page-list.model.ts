import { SystemMenu } from '../../system-menu/models/system-menu.model';
export interface SystemMenuPageList {
  count: number;
  data?: SystemMenu[];
  pageIndex: number;

}
