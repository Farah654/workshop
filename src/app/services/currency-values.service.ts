import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExchangeRateParams {
  currencyFrom: string;
  currencyTo: string;
  startDate: string;
  endDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  apiUrl = 'https://marketdata.tradermade.com/api/v1/timeseries';
  constructor(private http: HttpClient) {}
  // getExchangeRate(currencyFrom: string, currencyTo : string, startDate: string, endDate: string): Observable<any>
  getExchangeRate(params: ExchangeRateParams): Observable<any> {
    const { currencyFrom, currencyTo, startDate, endDate } = params;
    //const apiUrl = `https://marketdata.tradermade.com/api/v1/timeseries?currency=${currencyFrom.toUpperCase()}${currencyTo .toUpperCase()}&start_date=${startDate}&end_date=${endDate}&api_key=wh6RTEkkudT-zxDMLuZ1`;
    let queryParams = new HttpParams()
      .set(
        'currency',
        `${currencyFrom.toUpperCase()}${currencyTo.toUpperCase()}`
      )
      .set('start_date', startDate)
      .set('end_date', endDate)
      .set('api_key', 'N3dQNjQN3LWaK3Km6GS4');

    return this.http.get(this.apiUrl, { params: queryParams });
  }
}
