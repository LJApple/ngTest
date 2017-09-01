import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectCodeComponent } from './defect-code.component';

describe('DefectCodeComponent', () => {
  let component: DefectCodeComponent;
  let fixture: ComponentFixture<DefectCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
