import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDataRoutingModule } from './master-data-routing.module';
import { MasterDataComponent } from './master-data.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  declarations: [MasterDataComponent],
  imports: [CommonModule, MasterDataRoutingModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class MasterDataModule {}
