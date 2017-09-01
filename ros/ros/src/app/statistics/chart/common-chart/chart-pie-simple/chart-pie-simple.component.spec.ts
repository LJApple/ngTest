import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieSimpleComponent } from './chart-pie-simple.component';

describe('ChartPieSimpleComponent', () => {
  let component: ChartPieSimpleComponent;
  let fixture: ComponentFixture<ChartPieSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPieSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPieSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
