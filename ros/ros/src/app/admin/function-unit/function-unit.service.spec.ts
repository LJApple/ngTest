import { TestBed, inject } from '@angular/core/testing';

import { FunctionUnitService } from './function-unit.service';

describe('FunctionUnitService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FunctionUnitService]
        });
    });

    it('should be created', inject([FunctionUnitService], (service: FunctionUnitService) => {
        expect(service).toBeTruthy();
    }));
});
