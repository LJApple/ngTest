import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessGridComponent } from './process-grid.component';

describe('ProcessGridComponent', () => {
  let component: ProcessGridComponent;
  let fixture: ComponentFixture<ProcessGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
