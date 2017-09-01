import { TestBed, inject } from '@angular/core/testing';

import { FinanceChartService } from './finance-chart.service';

describe('FinanceChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinanceChartService]
    });
  });

  it('should be created', inject([FinanceChartService], (service: FinanceChartService) => {
    expect(service).toBeTruthy();
  }));
});
