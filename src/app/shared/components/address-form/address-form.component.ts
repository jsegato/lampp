import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Address } from '../../models/address';

import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgxMaskModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class AddressFormComponent implements OnInit {
  @Output() backEvent = new EventEmitter<boolean>();
  @Output() saveAddress = new EventEmitter<Address>();

  form: FormGroup;

  states = [
    { description: 'Acre', value: 'AC' }
  ]


  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: [null],
      zipcode: [null, [Validators.required]],
      street: [null, [Validators.required]],
      number: [null, [Validators.required]],
      complement: [null],
      neighborhood: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      referencePoint: [null]
    });
  }

  ngOnInit(): void {
  }


  back() {
    this.backEvent.emit(true);
  }

  submit() {
    if (this.form.valid) {
      const address = this.form.value as Address;
      this.saveAddress.emit(address);
    }
  }
}
