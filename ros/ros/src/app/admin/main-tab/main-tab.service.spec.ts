import { TestBed, inject } from '@angular/core/testing';

import { MainTabService } from './main-tab.service';

describe('MainTabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainTabService]
    });
  });

  it('should be created', inject([MainTabService], (service: MainTabService) => {
    expect(service).toBeTruthy();
  }));
});
