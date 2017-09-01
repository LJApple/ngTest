import { TestBed, inject } from '@angular/core/testing';

import { FactoryModelTypeService } from './factory-model-type.service';

describe('FactoryModelTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactoryModelTypeService]
    });
  });

  it('should be created', inject([FactoryModelTypeService], (service: FactoryModelTypeService) => {
    expect(service).toBeTruthy();
  }));
});
