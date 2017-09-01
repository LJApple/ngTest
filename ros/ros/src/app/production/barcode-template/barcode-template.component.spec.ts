import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeTemplateComponent } from './barcode-template.component';

describe('BarcodeTemplateComponent', () => {
  let component: BarcodeTemplateComponent;
  let fixture: ComponentFixture<BarcodeTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
