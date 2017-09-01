import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadCodeTypeComponent } from './bad-code-type.component';

describe('BadCodeTypeComponent', () => {
  let component: BadCodeTypeComponent;
  let fixture: ComponentFixture<BadCodeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadCodeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadCodeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
