import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { DropdownOptionsService,CurrencyResponse } from '../../services/dropdown-options.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.scss'],
})
export class CurrencyDropdownComponent implements OnInit {
  availableCurrencies$!: Observable<CurrencyResponse>;
  options$!: Observable< { value: string; label: string }[]>;
  selectedOption: string = '';
  @Input() defaultSelected: string = '';
  @Output() currencySelector: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dropdownOptionsService: DropdownOptionsService) {


  }

  // ngOnInit() {
  //  // this.dropdownOptionsService.getOptions().subscribe((data) => {
  //     this.availableCurrencies$ = this.dropdownOptionsService.getOptions();
  //     this.options$ = Object.keys(this.availableCurrencies).map((value) => ({
  //       value,
  //       label: this.availableCurrencies[value],
  //     ));

  //     console.log(this.options);
  //     if (this.defaultSelected) {
  //       this.currencySelector.emit(this.defaultSelected);
  //     }
  //   });
  // }
  ngOnInit() {
    this.availableCurrencies$ = this.dropdownOptionsService.getOptions();
    this.options$ = this.availableCurrencies$.pipe(
      map((data) =>
        Object.keys(data.available_currencies).map((value) => ({
          value,
          label: data.available_currencies[value],
        }))
      )
    );

    this.availableCurrencies$.subscribe((data) => {
      if (this.defaultSelected) {
        this.currencySelector.emit(this.defaultSelected);
      }
    });
  }

  selectCurrency(event: any) {
    const currency = event.target.value;
    this.selectedOption = currency;
    this.currencySelector.emit(currency);

    console.log(currency);
  }
}
