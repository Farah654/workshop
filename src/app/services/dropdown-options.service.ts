import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface CurrencyResponse {
  available_currencies: { [key: string]: string };
  endpoint: string;
}


@Injectable({
  providedIn: 'root',
})
export class DropdownOptionsService {
  apiUrl =
    'https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=N3dQNjQN3LWaK3Km6GS4';

  constructor(private http: HttpClient) {}

  getOptions(): Observable<CurrencyResponse> {
    return this.http
      .get<CurrencyResponse>(this.apiUrl)
      ;
  }
}
