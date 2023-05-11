import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

import { Customer } from '../../../../shared/models/customer';
import { CustomerService } from '../../../../shared/services/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit, OnDestroy {
  customers: Customer[];
  subscriptions = new Subscription();

  inactiveCustomer = false;
  searchCustomer: string | null = null;
  searchCustomerControl = new FormControl();

  constructor(
    private toastr: ToastrService,
    private customerService: CustomerService
    ) {
    this.customers = [];
  }

  ngOnInit(): void {
    this.getAllCustomers();

    this.subscriptions.add(
      this.searchCustomerControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(
        (value: string | null) => {
          this.searchCustomer = value;
          this.getAllCustomers();
        }
      ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getAllCustomers() {
    this.subscriptions.add(
      this.customerService.getAll(this.searchCustomer, this.inactiveCustomer)
        .subscribe({
          next: (customers) => {
            this.customers = customers;
          },
          error: (error) => {
            this.toastr.error('Falha ao obter a lista de clientes.');
            console.error(error);
          }
        }));
  }

}
