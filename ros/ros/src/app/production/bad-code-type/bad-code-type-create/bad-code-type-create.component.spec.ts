import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadCodeTypeCreateComponent } from './bad-code-type-create.component';

describe('BadCodeTypeCreateComponent', () => {
  let component: BadCodeTypeCreateComponent;
  let fixture: ComponentFixture<BadCodeTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadCodeTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadCodeTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
