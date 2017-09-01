import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasBackgroundComponent } from './canvas-background.component';

describe('CanvasBackgroundComponent', () => {
    let component: CanvasBackgroundComponent;
    let fixture: ComponentFixture<CanvasBackgroundComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CanvasBackgroundComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CanvasBackgroundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
