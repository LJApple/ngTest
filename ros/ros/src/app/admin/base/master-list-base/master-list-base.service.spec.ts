import { TestBed, inject } from '@angular/core/testing';

import { MasterListBaseService } from './master-list-base.service';

describe('MasterListBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterListBaseService]
    });
  });

  it('should be created', inject([MasterListBaseService], (service: MasterListBaseService) => {
    expect(service).toBeTruthy();
  }));
});
