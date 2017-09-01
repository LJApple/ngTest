import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionCreateBaseComponent } from './function-create-base.component';

describe('FunctionCreateBaseComponent', () => {
    let component: FunctionCreateBaseComponent;
    let fixture: ComponentFixture<FunctionCreateBaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FunctionCreateBaseComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FunctionCreateBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
