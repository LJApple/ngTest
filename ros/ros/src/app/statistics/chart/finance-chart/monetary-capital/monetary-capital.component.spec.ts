import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryCapitalComponent } from './monetary-capital.component';

describe('MonetaryCapitalComponent', () => {
  let component: MonetaryCapitalComponent;
  let fixture: ComponentFixture<MonetaryCapitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonetaryCapitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonetaryCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
