import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopDetailChartComponent } from './workshop-detail-chart.component';

describe('WorkshopDetailChartComponent', () => {
  let component: WorkshopDetailChartComponent;
  let fixture: ComponentFixture<WorkshopDetailChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopDetailChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopDetailChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
