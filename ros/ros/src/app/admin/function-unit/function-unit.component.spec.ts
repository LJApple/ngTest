import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionUnitComponent } from './function-unit.component';

describe('FunctionUnitComponent', () => {
    let component: FunctionUnitComponent;
    let fixture: ComponentFixture<FunctionUnitComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FunctionUnitComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FunctionUnitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
