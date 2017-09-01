import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineUtilizationRateChartComponent } from './machine-utilization-rate-chart.component';

describe('MachineUtilizationRateChartComponent', () => {
  let component: MachineUtilizationRateChartComponent;
  let fixture: ComponentFixture<MachineUtilizationRateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineUtilizationRateChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineUtilizationRateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
