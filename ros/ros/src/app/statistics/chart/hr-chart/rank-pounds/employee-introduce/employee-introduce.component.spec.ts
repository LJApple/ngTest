import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIntroduceComponent } from './employee-introduce.component';

describe('EmployeeIntroduceComponent', () => {
  let component: EmployeeIntroduceComponent;
  let fixture: ComponentFixture<EmployeeIntroduceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeIntroduceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeIntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
