import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryModelComponent } from './factory-model.component';

describe('FactoryModelComponent', () => {
  let component: FactoryModelComponent;
  let fixture: ComponentFixture<FactoryModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
