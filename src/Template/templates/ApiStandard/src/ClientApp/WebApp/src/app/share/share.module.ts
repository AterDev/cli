import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToKeyValuePipe } from './pipe/to-key-value.pipe';
import { ComponentsModule } from '../components/components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TypedCellDefDirective } from '../components/typed-cell-def.directive';

@NgModule({
  declarations: [ToKeyValuePipe, TypedCellDefDirective],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    ToKeyValuePipe,
    TypedCellDefDirective
  ]
})
export class ShareModule { }


const FormModules = [
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatRadioModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ...FormModules,

  ],
  exports: [
    CommonModule,
    RouterModule,
    ...FormModules,
  ]
})
export class FormModule { }