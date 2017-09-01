import { TestBed, inject } from '@angular/core/testing';

import { AccountBookService } from './account-book.service';

describe('AccountBookService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AccountBookService]
        });
    });

    it('should be created', inject([AccountBookService], (service: AccountBookService) => {
        expect(service).toBeTruthy();
    }));
});
