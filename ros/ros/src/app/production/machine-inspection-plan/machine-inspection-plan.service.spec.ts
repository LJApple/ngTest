import { TestBed, inject } from '@angular/core/testing';

import { MachineInspectionPlanService } from './machine-inspection-plan.service';

describe('MachineInspectionPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineInspectionPlanService]
    });
  });

  it('should be created', inject([MachineInspectionPlanService], (service: MachineInspectionPlanService) => {
    expect(service).toBeTruthy();
  }));
});
