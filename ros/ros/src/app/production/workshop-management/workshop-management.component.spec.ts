import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopManagementComponent } from './workshop-management.component';

describe('WorkshopManagementComponent', () => {
  let component: WorkshopManagementComponent;
  let fixture: ComponentFixture<WorkshopManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
