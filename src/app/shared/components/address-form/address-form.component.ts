import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { States } from '../../models/states';
import { Address } from '../../models/address';
import { StatesService } from '../../services/states.service';

import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
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
export class AddressFormComponent implements OnInit, OnDestroy {
  @Output() backEvent = new EventEmitter<boolean>();
  @Output() saveAddress = new EventEmitter<Address>();

  form: FormGroup;
  states: States[];
  subscriptions = new Subscription();

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private statesServices: StatesService
  ) {
    this.states = [];
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
    this.getStates();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getStates(): void {
    this.subscriptions.add(
      this.statesServices.getAll().subscribe({
        next: (states) => {
          this.states = states;
        },
        error: (error) => {
          this.toastr.error('Falha ao obter a lista de estados.');
          console.error(error);
        }
      }));
  }

  back(): void {
    this.backEvent.emit(true);
  }

  submit(): void {
    if (this.form.valid) {
      const address = this.form.value as Address;
      this.saveAddress.emit(address);
    }
  }
}
