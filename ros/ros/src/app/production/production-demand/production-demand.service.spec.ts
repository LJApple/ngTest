import { TestBed, inject } from '@angular/core/testing';

import { ProductionDemandService } from './production-demand.service';

describe('ProductionDemandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductionDemandService]
    });
  });

  it('should be created', inject([ProductionDemandService], (service: ProductionDemandService) => {
    expect(service).toBeTruthy();
  }));
});
