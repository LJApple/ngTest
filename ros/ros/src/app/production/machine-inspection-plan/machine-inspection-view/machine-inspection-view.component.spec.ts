import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineInspectionViewComponent } from './machine-inspection-view.component';

describe('MachineInspectionViewComponent', () => {
  let component: MachineInspectionViewComponent;
  let fixture: ComponentFixture<MachineInspectionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineInspectionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineInspectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
