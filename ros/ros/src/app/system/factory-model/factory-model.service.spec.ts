import { TestBed, inject } from '@angular/core/testing';

import { FactoryModelService } from './factory-model.service';

describe('FactoryModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactoryModelService]
    });
  });

  it('should be created', inject([FactoryModelService], (service: FactoryModelService) => {
    expect(service).toBeTruthy();
  }));
});
