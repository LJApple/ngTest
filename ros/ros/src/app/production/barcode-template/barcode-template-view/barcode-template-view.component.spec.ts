import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeTemplateViewComponent } from './barcode-template-view.component';

describe('BarcodeTemplateViewComponent', () => {
  let component: BarcodeTemplateViewComponent;
  let fixture: ComponentFixture<BarcodeTemplateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeTemplateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeTemplateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
