import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  create(customer: Customer): Observable<Customer> {
    const url = `${environment.API}/customers`;
    return this.httpClient.post<Customer>(url, customer);
  }

  getAll(search: string | null, inactive: boolean): Observable<Customer[]> {
    let params = new HttpParams()
    .set('active', !inactive);
    if (search) {
      params = params.append('name_like', search);
    }
    const url = `${environment.API}/customers?_embed=address`;
    return this.httpClient.get<Customer[]>(url, { params: params });
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${environment.API}/customers/${id}?_embed=address`;
    return this.httpClient.get<Customer>(url);
  }

  changeStatus(id: number, active: boolean): Observable<Customer> {
    const url = `${environment.API}/customers/${id}`;
    const body = { active: active };
    return this.httpClient.patch<Customer>(url, body);
  }

}
