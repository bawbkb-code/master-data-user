import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDataRoutingModule } from './master-data-routing.module';
import { MasterDataComponent } from './master-data.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MasterDataComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MasterDataRoutingModule
  ]
})
export class MasterDataModule { }
