import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLineTwoComponent } from './chart-line-two.component';

describe('ChartLineTwoComponent', () => {
  let component: ChartLineTwoComponent;
  let fixture: ComponentFixture<ChartLineTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartLineTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLineTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
