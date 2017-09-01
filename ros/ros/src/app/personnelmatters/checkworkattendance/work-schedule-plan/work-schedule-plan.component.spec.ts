import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSchedulePlanComponent } from './work-schedule-plan.component';

describe('WorkSchedulePlanComponent', () => {
  let component: WorkSchedulePlanComponent;
  let fixture: ComponentFixture<WorkSchedulePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSchedulePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSchedulePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
