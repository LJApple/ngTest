import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPersonageComponent } from './sales-personage.component';

describe('SalesPersonageComponent', () => {
  let component: SalesPersonageComponent;
  let fixture: ComponentFixture<SalesPersonageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPersonageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPersonageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
