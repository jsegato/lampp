import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { States } from '../models/states';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<States[]> {
    const url = `${environment.API}/states`;
    return this.httpClient.get<States[]>(url);
  }


}
