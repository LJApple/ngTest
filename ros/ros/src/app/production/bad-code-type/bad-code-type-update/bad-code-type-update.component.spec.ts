import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadCodeTypeUpdateComponent } from './bad-code-type-update.component';

describe('BadCodeTypeUpdateComponent', () => {
  let component: BadCodeTypeUpdateComponent;
  let fixture: ComponentFixture<BadCodeTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadCodeTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadCodeTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
