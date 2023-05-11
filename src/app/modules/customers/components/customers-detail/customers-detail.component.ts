import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.scss']
})
export class CustomersDetailComponent implements OnInit {
  customer: Customer;

  constructor(public location: Location) { 
    this.customer = {
      id: 1,
      name: 'Jussiê Segato',
      email: 'jussie.segato@gmail.com',
      gender: 'Masculino',
      phone: '(54) 9 9179-8138',
      document: '010.872.620-70',
      dateBirth: '15/02/1985',
      active: true,
      address: {
        id: 1,
        zipcode: '95.110-456',
        street: 'Rua Oli Debastiani',
        complement: 'Casa',
        number: '213',
        neighborhood: 'Desvio Rizzo',
        city: 'Caxias do Sul',
        state: 'RS'
      }
    }
   }

  ngOnInit(): void {
  }

}
