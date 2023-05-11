import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  create(address: Address): Observable<Address> {
    const url = `${environment.API}/address`;
    return this.httpClient.post<Address>(url, address);
  }

  getAddres(id: number): Observable<Address> {
    const url = `${environment.API}/address/${id}`;
    return this.httpClient.get<Address>(url);
  }

}
