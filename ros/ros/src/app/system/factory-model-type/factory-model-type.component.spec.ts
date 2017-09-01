import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryModelTypeComponent } from './factory-model-type.component';

describe('FactoryModelTypeComponent', () => {
  let component: FactoryModelTypeComponent;
  let fixture: ComponentFixture<FactoryModelTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryModelTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryModelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
