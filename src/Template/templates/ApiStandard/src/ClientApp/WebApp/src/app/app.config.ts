import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CustomerHttpInterceptor } from './customer-http.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { TypedCellDefDirective } from './share/typed-cell-def.directive';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: CustomerHttpInterceptor, multi: true },
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  ],
};



export const baseMatModules = [
  CommonModule, MatIconModule, MatTooltipModule, MatButtonModule, MatProgressSpinnerModule, MatToolbarModule
];
// 表单页面依赖的模块
export const CommonFormModules = [...baseMatModules, MatFormFieldModule, MatDialogModule, ReactiveFormsModule, FormsModule, MatInputModule, MatSelectModule, MatDatepickerModule];
// 列表页面依赖的模块
export const CommonListModules = [...baseMatModules, MatTableModule, MatPaginatorModule, MatDialogModule, RouterModule];
export const commonModules = [CommonModule, RouterModule]