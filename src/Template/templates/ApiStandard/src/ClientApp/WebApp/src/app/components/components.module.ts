import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTreeModule } from '@angular/material/tree';
import { MatSliderModule } from '@angular/material/slider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SyncButtonComponent } from './sync-button/sync-button.component';
import { CustomPaginatorIntl } from './CustomPaginatorIntl';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { TagComponent } from './tag/tag.component';

const MaterialModules = [
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatSnackBarModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatExpansionModule,
  MatDialogModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatStepperModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSortModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatTreeModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatRadioModule,
];

@NgModule({
  declarations: [LayoutComponent, ConfirmDialogComponent, AvatarComponent, SyncButtonComponent,TagComponent],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...MaterialModules,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ...MaterialModules,
    LayoutComponent,
    ConfirmDialogComponent,
    AvatarComponent,
    SyncButtonComponent,
    TagComponent
  ]
})
export class ComponentsModule { }
