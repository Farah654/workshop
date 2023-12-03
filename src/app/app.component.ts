import { Component } from '@angular/core';
//import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  title = 'workshop-';
  currencyFrom = 'usd';
  currencyTo  = 'eur';
  onCurrencyFromChanged(curr: string) {
    this.currencyFrom = curr;
  }
  onCurrencyToChanged(curr: string) {
    this.currencyTo = curr;
  }
  
}
