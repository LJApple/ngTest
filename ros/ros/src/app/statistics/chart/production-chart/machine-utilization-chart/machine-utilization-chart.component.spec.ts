import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineUtilizationChartComponent } from './machine-utilization-chart.component';

describe('MachineUtilizationChartComponent', () => {
  let component: MachineUtilizationChartComponent;
  let fixture: ComponentFixture<MachineUtilizationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineUtilizationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineUtilizationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
