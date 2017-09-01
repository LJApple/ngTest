import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieSectorComponent } from './chart-pie-sector.component';

describe('ChartPieSectorComponent', () => {
  let component: ChartPieSectorComponent;
  let fixture: ComponentFixture<ChartPieSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPieSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPieSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
