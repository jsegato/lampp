import { Location } from '@angular/common';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Address } from '../../../../shared/models/address';
import { Customer } from '../../../../shared/models/customer';
import { CustomerService } from '../../../../shared/services/customer.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnDestroy {

  step = 1;
  update = false;
  form: FormGroup;
  address: Address;
  customer: Customer;
  subscriptions = new Subscription();

  constructor(
    public location: Location,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private addressService: AddressService,
    private customerService: CustomerService,
  ) {
    this.address = {} as Address;
    this.customer = {} as Customer;

    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      document: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dateBirth: [null, [Validators.required]],
      gender: [null, Validators.required],
      active: [true],
    });
  }

  ngOnInit() {
    this.subscriptions.add(this.activateRoute.paramMap.subscribe(
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  getCustomer(id: number): void {
    this.subscriptions.add(
      this.customerService.getCustomer(id).subscribe({
        next: (customer) => {
          this.update = true;
          this.customer = customer;
          this.form.patchValue(customer);
          if (this.customer.address.length > 0) {
            this.address = customer.address[0];
          }
        },
        error: (error) => {
          this.toastr.error('Falha ao obter as informações do cliente');
          console.error(error);
        }
      }));
  }


  next(): void {
    if (this.form.valid) {
      this.step = 2;
    }
  }

  back(): void {
    this.step = 1;
  }

  save(address: Address): void {
    this.customer = this.form.value as Customer;
    this.address = address;
    if (this.update) {
      this.updateCustomer();
    } else {
      this.createCustomer();
    }
  }

  createCustomer(): void {
    this.subscriptions.add(
      this.customerService.create(this.customer).subscribe({
        next: (customer) => {
          this.address.customerId = customer.id;
          this.createAddress();
        },
        error: (error) => {
          this.toastr.error('Falha ao salvar o cadastro do cliente.');
          console.error(error);
        }
      }));
  }

  updateCustomer(): void {
    this.subscriptions.add(
      this.customerService.update(this.customer.id, this.customer).subscribe({
        next: (customer) => {
          this.address.customerId = customer.id;
          this.updateAddress();
        },
        error: (error) => {
          this.toastr.error('Falha ao atualizar o cadastro do cliente.');
          console.error(error);
        }
      }));
  }

  createAddress(): void {
    this.subscriptions.add(
      this.addressService.create(this.address).subscribe({
        next: () => {
          this.toastr.success('Novo cliente incluído com sucesso!');
          this.location.back();
        },
        error: (error) => {
          this.toastr.error('Falha ao salvar as informações do endereço do cliente.');
          console.error(error);
        }
      }));
  }

  updateAddress(): void {
    this.subscriptions.add(
      this.addressService.update(this.address.id, this.address).subscribe({
        next: () => {
          this.toastr.success('Cliente atualizado com sucesso!');
          this.location.back();
        },
        error: (error) => {
          this.toastr.error('Falha ao atualizar as informações do endereço do cliente.');
          console.error(error);
        }
      }));
  }

}
