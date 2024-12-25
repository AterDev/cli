import { NgModule } from '@angular/core';
import { SystemLogsRoutingModule } from './system-logs-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { IndexComponent } from './index/index.component';
import { EnumTextPipeModule } from 'src/app/pipe/admin/enum-text.pipe';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    ComponentsModule,
    ShareModule,
    SystemLogsRoutingModule,
    EnumTextPipeModule
  ]
})
export class SystemLogsModule { }
