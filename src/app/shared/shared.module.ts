import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FieldErrorDisplayComponent, ValidationMessageComponent } from './components';

@NgModule({
  declarations: [FieldErrorDisplayComponent],
  exports: [FieldErrorDisplayComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class SharedModule {}
