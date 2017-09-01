import { TestBed, inject } from '@angular/core/testing';

import { MachineInspectionViewService } from './machine-inspection-view.service';

describe('MachineInspectionViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineInspectionViewService]
    });
  });

  it('should be created', inject([MachineInspectionViewService], (service: MachineInspectionViewService) => {
    expect(service).toBeTruthy();
  }));
});
