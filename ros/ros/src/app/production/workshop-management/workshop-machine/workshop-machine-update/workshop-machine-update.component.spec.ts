import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopMachineUpdateComponent } from './workshop-machine-update.component';

describe('WorkshopMachineUpdateComponent', () => {
  let component: WorkshopMachineUpdateComponent;
  let fixture: ComponentFixture<WorkshopMachineUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopMachineUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopMachineUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
