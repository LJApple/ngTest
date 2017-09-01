import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarLineComponent } from './chart-bar-line.component';

describe('ChartBarLineComponent', () => {
  let component: ChartBarLineComponent;
  let fixture: ComponentFixture<ChartBarLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartBarLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBarLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
