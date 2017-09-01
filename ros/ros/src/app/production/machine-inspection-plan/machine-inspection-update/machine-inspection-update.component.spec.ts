import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineInspectionUpdateComponent } from './machine-inspection-update.component';

describe('MachineInspectionUpdateComponent', () => {
  let component: MachineInspectionUpdateComponent;
  let fixture: ComponentFixture<MachineInspectionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineInspectionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineInspectionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
