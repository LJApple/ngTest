import { TestBed, inject } from '@angular/core/testing';

import { BarcodeTemplateService } from './barcode-template.service';

describe('BarcodeTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarcodeTemplateService]
    });
  });

  it('should be created', inject([BarcodeTemplateService], (service: BarcodeTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
