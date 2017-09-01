import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutSourceReportComponent } from './out-source-report.component';

describe('OutSourceReportComponent', () => {
  let component: OutSourceReportComponent;
  let fixture: ComponentFixture<OutSourceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutSourceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutSourceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
