import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeTemplateCreateComponent } from './barcode-template-create.component';

describe('BarcodeTemplateCreateComponent', () => {
  let component: BarcodeTemplateCreateComponent;
  let fixture: ComponentFixture<BarcodeTemplateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeTemplateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
