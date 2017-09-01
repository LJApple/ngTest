import { TestBed, inject } from '@angular/core/testing';

import { ProductionChartService } from './production-chart.service';

describe('ProductionChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductionChartService]
    });
  });

  it('should be created', inject([ProductionChartService], (service: ProductionChartService) => {
    expect(service).toBeTruthy();
  }));
});
