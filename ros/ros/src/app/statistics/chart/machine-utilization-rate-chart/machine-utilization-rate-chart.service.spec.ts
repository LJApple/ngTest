import { TestBed, inject } from '@angular/core/testing';

import { MachineUtilizationRateChartService } from './machine-utilization-rate-chart.service';

describe('MachineUtilizationRateChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineUtilizationRateChartService]
    });
  });

  it('should be created', inject([MachineUtilizationRateChartService], (service: MachineUtilizationRateChartService) => {
    expect(service).toBeTruthy();
  }));
});
