import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineUsageDatailChartComponent } from './machine-usage-datail-chart.component';

describe('MachineUsageDatailChartComponent', () => {
  let component: MachineUsageDatailChartComponent;
  let fixture: ComponentFixture<MachineUsageDatailChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineUsageDatailChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineUsageDatailChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
