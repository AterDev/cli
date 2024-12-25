import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ShareModule } from '../share/share.module';
import { SystemUserModule } from './system-user/system-user.module';
import { SystemRoleModule } from './system-role/system-role.module';
import { SystemLogsModule } from './system-logs/system-logs.module';
import { SystemConfigModule } from './system-config/system-config.module';
import { CustomerInfoModule } from './customer-info/customer-info.module';
import { DataImportComponent } from './data-import/data-import.component';


@NgModule({
  declarations: [AdminLayoutComponent, NavigationComponent, DataImportComponent],
  imports: [
    CommonModule,
    ShareModule,
    AdminRoutingModule,
    SystemUserModule,
    SystemRoleModule,
    SystemLogsModule,
    SystemConfigModule,
    CustomerInfoModule
  ]
})
export class AdminModule { }
