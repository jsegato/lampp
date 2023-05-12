import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersDetailComponent } from './components/customers-detail/customers-detail.component';

const routes: Routes = [
  { path: '', component: CustomersListComponent },
  { path: 'cadastrar', component: CustomerFormComponent },
  { path: 'editar/:id', component: CustomerFormComponent },
  { path: 'detalhes/:id', component: CustomersDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
