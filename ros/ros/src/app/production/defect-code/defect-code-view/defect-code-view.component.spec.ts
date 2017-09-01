import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectCodeViewComponent } from './defect-code-view.component';

describe('DefectCodeViewComponent', () => {
  let component: DefectCodeViewComponent;
  let fixture: ComponentFixture<DefectCodeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectCodeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectCodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
