import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineOutputSortChartComponent } from './machine-output-sort-chart.component';

describe('MachineOutputSortChartComponent', () => {
  let component: MachineOutputSortChartComponent;
  let fixture: ComponentFixture<MachineOutputSortChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineOutputSortChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineOutputSortChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
