import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumRateChartComponent } from './num-rate-chart.component';

describe('NumRateChartComponent', () => {
  let component: NumRateChartComponent;
  let fixture: ComponentFixture<NumRateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumRateChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumRateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
