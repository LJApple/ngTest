import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureStationGridComponent } from './procedure-station-grid.component';

describe('ProcedureStationGridComponent', () => {
  let component: ProcedureStationGridComponent;
  let fixture: ComponentFixture<ProcedureStationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureStationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureStationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
