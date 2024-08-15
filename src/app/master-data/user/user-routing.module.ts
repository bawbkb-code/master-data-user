import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'new', component: FormComponent },
  { path: 'edit', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
