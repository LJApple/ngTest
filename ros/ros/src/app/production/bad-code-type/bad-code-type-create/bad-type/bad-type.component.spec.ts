import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadTypeComponent } from './bad-type.component';

describe('BadTypeComponent', () => {
  let component: BadTypeComponent;
  let fixture: ComponentFixture<BadTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
