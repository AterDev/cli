import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { NotfoundComponent } from './public/notfound/notfound.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: NotfoundComponent },
    // { path: '*', redirectTo: '', pathMatch: 'full' },

    {
        path: 'admin',
        component: AdminLayoutComponent,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: 'mobile',
        loadChildren: () => import('./mobile/mobile.module').then(m => m.MobileModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }