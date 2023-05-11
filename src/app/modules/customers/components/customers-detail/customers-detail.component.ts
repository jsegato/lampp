import { Location } from '@angular/common';

import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Address } from '../../../../shared/models/address';
import { Customer } from '../../../../shared/models/customer';
import { CustomerService } from '../../../../shared/services/customer.service';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.scss']
})
export class CustomersDetailComponent implements OnInit, OnDestroy {
  address: Address;
  customer: Customer;
  subscriptions = new Subscription();

  constructor(
    public location: Location,
    private activateRoute: ActivatedRoute,
    private customerService: CustomerService

  ) {
    this.address = {} as Address;
    this.customer = {} as Customer;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.activateRoute.paramMap.subscribe(
        {
          next: (params: ParamMap) => {
            if (params.has('id')) {
              const id = Number(params.get('id'));
              if (!isNaN(id)) {
                this.getCustomer(id);
              }
            }
          }
        }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getCustomer(id: number): void {
    this.subscriptions.add(
      this.customerService.getCustomer(id).subscribe({
        next: (customer) => {
          this.customer = customer;
          if (this.customer.address.length > 0) {
            this.address = customer.address[0];
          }
        },
        error: (error) => {
          console.error(error);
        }
      }));
  }
}
