import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListBaseChildComponent } from './master-list-base-child.component';

describe('MasterListBaseChildComponent', () => {
    let component: MasterListBaseChildComponent;
    let fixture: ComponentFixture<MasterListBaseChildComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MasterListBaseChildComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MasterListBaseChildComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
