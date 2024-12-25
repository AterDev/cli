import { NgModule } from '@angular/core';
import { MobileRoutingModule } from './mobile-routing.module';
import { ShareModule } from '../share/share.module';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    MatGridListModule,
    MobileRoutingModule,
  ]
})
export class MobileModule { }
