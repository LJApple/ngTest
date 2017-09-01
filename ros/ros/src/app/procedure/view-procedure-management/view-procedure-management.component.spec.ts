import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProcedureManagementComponent } from './view-procedure-management.component';

describe('ViewProcedureManagementComponent', () => {
  let component: ViewProcedureManagementComponent;
  let fixture: ComponentFixture<ViewProcedureManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProcedureManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProcedureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
