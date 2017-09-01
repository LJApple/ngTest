import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrChartComponent } from './hr-chart.component';

describe('OrganizationAnalysisComponent', () => {
  let component: HrChartComponent;
  let fixture: ComponentFixture<HrChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

