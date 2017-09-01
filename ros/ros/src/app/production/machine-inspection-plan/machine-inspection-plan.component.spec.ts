import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineInspectionPlanComponent } from './machine-inspection-plan.component';

describe('MachineInspectionPlanComponent', () => {
  let component: MachineInspectionPlanComponent;
  let fixture: ComponentFixture<MachineInspectionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineInspectionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineInspectionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
