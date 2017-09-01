import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopMachineViewComponent } from './workshop-machine-view.component';

describe('WorkshopMachineViewComponent', () => {
  let component: WorkshopMachineViewComponent;
  let fixture: ComponentFixture<WorkshopMachineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopMachineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopMachineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
