import { Component, Input, OnInit } from '@angular/core';

import { Customer } from '../../../../shared/models/customer';

@Component({
  selector: 'app-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss']
})
export class CustomersCardComponent implements OnInit {
  @Input() customer: Customer;
  
  isChecked = true;

  constructor() { 
    this.customer = {} as Customer;
  }

  ngOnInit(): void {
  }

}
