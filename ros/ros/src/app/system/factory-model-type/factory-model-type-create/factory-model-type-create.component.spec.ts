import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryModelTypeCreateComponent } from './factory-model-type-create.component';

describe('FactoryModelTypeCreateComponent', () => {
  let component: FactoryModelTypeCreateComponent;
  let fixture: ComponentFixture<FactoryModelTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryModelTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryModelTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
