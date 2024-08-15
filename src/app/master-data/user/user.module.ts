import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FilterComponent } from './filter/filter.component';
import { FormComponent } from './form/form.component';
import { TableListComponent } from './table-list/table-list.component';
import { UserComponent } from './user.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule  } from 'primeng/paginator';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    FilterComponent,
    FormComponent,
    TableListComponent
  ],
  imports: [
    PaginatorModule,
    TableModule,
    CommonModule,
    UserRoutingModule,
    ButtonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserModule { }
