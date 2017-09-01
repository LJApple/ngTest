import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRectangleComponent } from './chart-rectangle.component';

describe('ChartRectangleComponent', () => {
  let component: ChartRectangleComponent;
  let fixture: ComponentFixture<ChartRectangleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRectangleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
