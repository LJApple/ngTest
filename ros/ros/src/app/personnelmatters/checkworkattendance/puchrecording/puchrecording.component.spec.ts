import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuchrecordingComponent } from './puchrecording.component';

describe('PuchrecordingComponent', () => {
  let component: PuchrecordingComponent;
  let fixture: ComponentFixture<PuchrecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuchrecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuchrecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
