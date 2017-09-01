import { TestBed, inject } from '@angular/core/testing';

import { MachineUsageDetailChartService } from './machine-usage-detail-chart.service';

describe('MachineUsageDetailChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineUsageDetailChartService]
    });
  });

  it('should be created', inject([MachineUsageDetailChartService], (service: MachineUsageDetailChartService) => {
    expect(service).toBeTruthy();
  }));
});
