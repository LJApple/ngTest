import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineInspectionCreateComponent } from './machine-inspection-create.component';

describe('MachineInspectionCreateComponent', () => {
  let component: MachineInspectionCreateComponent;
  let fixture: ComponentFixture<MachineInspectionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineInspectionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineInspectionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
