import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Address } from '../../../../shared/models/address';
import { Customer } from '../../../../shared/models/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  step = 1;
  form: FormGroup;

  constructor(
    public location: Location,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      document: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dateBirth: [null, [Validators.required]],
      active: [true],
    });
  }

  ngOnInit(): void {
  }

  next() {
    if (this.form.valid) {
      this.step = 2;
    }
  }

  back() {
    this.step = 1;
  }

  saveAddress(address: Address) {
    const customer = this.form.value as Customer;
    customer.address = address;
    this.location.back();
  }

}
