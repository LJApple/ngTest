import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBookComponent } from './account-book.component';

describe('AccountBookComponent', () => {
    let component: AccountBookComponent;
    let fixture: ComponentFixture<AccountBookComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountBookComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountBookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
