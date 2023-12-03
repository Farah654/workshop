import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CurrencyDropdownComponent } from './currency-dropdown.component';
import {
  DropdownOptionsService,
  CurrencyResponse,
} from '../../services/dropdown-options.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

describe('CurrencyDropdownComponent', () => {
  let component: CurrencyDropdownComponent;
  let fixture: ComponentFixture<CurrencyDropdownComponent>;
  let dropdownOptionsService: DropdownOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [CurrencyDropdownComponent],
    });
    fixture = TestBed.createComponent(CurrencyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch currencies from the API', () => {
    const mockCurrencies: CurrencyResponse = {
      available_currencies: {
        usd: 'US Dollar',
        eur: 'Euro',
        gbp: 'British Pound',
      },
      endpoint: 'mock_endpoint',
    };

    spyOn(dropdownOptionsService, 'getOptions').and.returnValue(
      of(mockCurrencies)
    );

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.availableCurrencies$).toBeDefined();
    expect(component.options$).toBeDefined();

    component.options$.subscribe((options) => {
      expect(options.length).toBe(
        Object.keys(mockCurrencies.available_currencies).length
      );

      expect(options[0].value).toBe('usd');
      expect(options[1].label).toBe('Euro');
    });
  });
});
