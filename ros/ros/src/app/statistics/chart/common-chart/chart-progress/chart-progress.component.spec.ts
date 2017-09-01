import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartProgressComponent } from './chart-progress.component';

describe('ChartProgressComponent', () => {
  let component: ChartProgressComponent;
  let fixture: ComponentFixture<ChartProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
