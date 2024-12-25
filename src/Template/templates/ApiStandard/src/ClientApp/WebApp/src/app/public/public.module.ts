import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { RegisterComponent } from './register/register.component';
import { ShareModule } from '../share/share.module';
import { EnumTextPipeModule } from '../pipe/admin/enum-text.pipe';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, NotfoundComponent],
  imports: [
    ShareModule,
    EnumTextPipeModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
