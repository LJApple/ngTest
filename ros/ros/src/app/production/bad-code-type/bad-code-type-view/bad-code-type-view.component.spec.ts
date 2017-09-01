import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadCodeTypeViewComponent } from './bad-code-type-view.component';

describe('BadCodeTypeViewComponent', () => {
  let component: BadCodeTypeViewComponent;
  let fixture: ComponentFixture<BadCodeTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadCodeTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadCodeTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
