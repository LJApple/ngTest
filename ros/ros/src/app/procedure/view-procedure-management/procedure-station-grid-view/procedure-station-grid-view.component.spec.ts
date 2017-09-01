import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureStationGridViewComponent } from './procedure-station-grid-view.component';

describe('ProcedureStationGridViewComponent', () => {
  let component: ProcedureStationGridViewComponent;
  let fixture: ComponentFixture<ProcedureStationGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureStationGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureStationGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
