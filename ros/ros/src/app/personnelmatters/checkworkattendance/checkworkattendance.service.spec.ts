import { TestBed, inject } from '@angular/core/testing';

import { CheckworkattendanceService } from './checkworkattendance.service';

describe('CheckworkattendanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckworkattendanceService]
    });
  });

  it('should be created', inject([CheckworkattendanceService], (service: CheckworkattendanceService) => {
    expect(service).toBeTruthy();
  }));
});
