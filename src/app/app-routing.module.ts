import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterDataComponent } from './master-data/master-data.component';

const routes: Routes = [
  { path: '', loadChildren: () => import("./master-data/master-data.module").then((m) => m.MasterDataModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
