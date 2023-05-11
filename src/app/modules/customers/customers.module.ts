import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AddressFormComponent } from '../../shared/components/address-form/address-form.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersCardComponent } from './components/customers-card/customers-card.component';
import { CustomersDetailComponent } from './components/customers-detail/customers-detail.component';

@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomersListComponent,
    CustomersCardComponent,
    CustomersDetailComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AddressFormComponent,
    MatSlideToggleModule,
    CustomersRoutingModule,
    NgxMaskModule.forRoot(),
  ]
})
export class CustomersModule { }
