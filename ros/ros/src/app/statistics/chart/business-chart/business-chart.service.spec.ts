import { TestBed, inject } from '@angular/core/testing';

import { BusinessChartService } from './business-chart.service';

describe('BusinessChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessChartService]
    });
  });

  it('should be created', inject([BusinessChartService], (service: BusinessChartService) => {
    expect(service).toBeTruthy();
  }));
});
