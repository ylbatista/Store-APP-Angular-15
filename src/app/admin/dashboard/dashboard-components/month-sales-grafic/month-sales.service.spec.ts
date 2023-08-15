import { TestBed } from '@angular/core/testing';

import { MonthSalesService } from './month-sales.service';

describe('MonthSalesService', () => {
  let service: MonthSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
