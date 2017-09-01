import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryModelTypeUpdateComponent } from './factory-model-type-update.component';

describe('FactoryModelTypeUpdateComponent', () => {
  let component: FactoryModelTypeUpdateComponent;
  let fixture: ComponentFixture<FactoryModelTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryModelTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryModelTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
