import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListBaseComponent } from './master-list-base.component';

describe('FunctionBaseComponent', () => {
    let component: MasterListBaseComponent;
    let fixture: ComponentFixture<MasterListBaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MasterListBaseComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MasterListBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
