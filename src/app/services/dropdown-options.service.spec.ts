import { TestBed,inject, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DropdownOptionsService, CurrencyResponse} from './dropdown-options.service';

describe('DropdownOptionsService', () => {
  let service: DropdownOptionsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule],
      providers: [DropdownOptionsService],});
    service = TestBed.inject(DropdownOptionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get options from the API', waitForAsync(() => {
    const mockResponse: CurrencyResponse = {
      available_currencies: {
        usd: 'US Dollar',
        eur: 'Euro',
        gbp: 'British Pound',
      },
      endpoint: 'mock_endpoint', 
    };
    service.getOptions().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(service.apiUrl);
    req.flush(mockResponse);
    httpTestingController.verify();
  }));
});
