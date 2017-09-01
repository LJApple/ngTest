import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDefectCodeComponent } from './create-defect-code.component';

describe('CreateDefectCodeComponent', () => {
  let component: CreateDefectCodeComponent;
  let fixture: ComponentFixture<CreateDefectCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDefectCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDefectCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
