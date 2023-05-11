import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Customer } from '../../../../shared/models/customer';
import { CustomerService } from '../../../../shared/services/customer.service';

@Component({
  selector: 'app-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss']
})
export class CustomersCardComponent implements OnInit {
  @Input() customer: Customer;
  @Output() update = new EventEmitter<boolean>();

  isChecked = true;

  constructor(
    private toastr: ToastrService,
    private customerService: CustomerService
  ) {
    this.customer = {} as Customer;
  }

  ngOnInit(): void {
    this.isChecked = this.customer.active;
  }

  changeStatus() {
    this.customerService.changeStatus(this.customer.id, this.isChecked)
      .subscribe({
        next: () => {
          this.update.emit(true);
          if (this.isChecked) {
            this.toastr.success('Cliente ativado com sucesso!');
          } else {
            this.toastr.success('Cliente desativado com sucesso!');
          }
        },
        error: (error) => {
          this.toastr.error('Falha ao atualizar o status do cliente.');
          console.error(error);
        }
      });
  }

}
