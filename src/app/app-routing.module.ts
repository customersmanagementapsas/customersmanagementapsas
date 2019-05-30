import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomersListComponent } from './customers-list/customers-list.component';

const routes: Routes = [
  {path: 'new-customer', component: CustomerFormComponent},
  {path: 'edit-customer/:id', component: CustomerFormComponent},
  {path: 'customers-list', component: CustomersListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
