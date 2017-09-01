import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieRadiusComponent } from './chart-pie-radius.component';

describe('ChartPieRadiusComponent', () => {
  let component: ChartPieRadiusComponent;
  let fixture: ComponentFixture<ChartPieRadiusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPieRadiusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPieRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
