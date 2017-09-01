import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeClockComponent } from './employee-clock.component';

describe('EmployeeClockComponent', () => {
  let component: EmployeeClockComponent;
  let fixture: ComponentFixture<EmployeeClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
