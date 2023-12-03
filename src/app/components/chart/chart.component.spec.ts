import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ChartComponent } from './chart.component';
import { ChartService } from '../../services/currency-values.service';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let chartService: ChartService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ChartComponent],
    });
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set default currencies and render corresponding flags', () => {
    const mockExchangeRateData = {
      quotes: [
        {
          request_time: '2023-01-01T00:00:00Z',
          date: '2023-01-01T00:00:00Z',
          close: 1.2,
        },
      ],
    };

    spyOn(chartService, 'getExchangeRate').and.returnValue(
      of(mockExchangeRateData)
    );

    expect(component.currencyFrom).toBe('eur');
    expect(component.currencyTo).toBe('usd');

    fixture.detectChanges();

    const flagElements =
      fixture.nativeElement.querySelectorAll('.currency-flag');
    expect(flagElements.length).toBe(2);

    const forexButton = fixture.nativeElement.querySelector(
      '.button.lighter-gray-bg.font-family'
    );
    expect(forexButton).toBeTruthy();
    expect(forexButton.textContent).toContain('Forex.com');
    expect(component.exchangeRate).toBe(
      mockExchangeRateData.quotes[0].close /
        mockExchangeRateData.quotes[0].close
    );
    fixture.detectChanges();
    const exchangeRateElement = fixture.nativeElement.querySelector(
      '.exchangeRate-amount'
    );
    const exchangeRatePercentageElement = fixture.nativeElement.querySelector(
      '.exchangeRate-percentage'
    );

    const precision = Math.min(2, Number.POSITIVE_INFINITY);
   
    expect(exchangeRateElement.textContent).toContain(
      component.exchangeRate.toFixed(precision)
    );
    expect(exchangeRatePercentageElement.textContent).toContain(
      (component.exchangeRate * 100).toFixed(precision)
    );
  });
});
