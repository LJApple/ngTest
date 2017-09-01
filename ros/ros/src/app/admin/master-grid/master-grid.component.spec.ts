import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterGridComponent } from './master-grid.component';

describe('MasterGridComponent', () => {
  let component: MasterGridComponent;
  let fixture: ComponentFixture<MasterGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
