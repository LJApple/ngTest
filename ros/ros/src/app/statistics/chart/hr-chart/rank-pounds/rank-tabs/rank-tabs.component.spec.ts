import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankTabsComponent } from './rank-tabs.component';

describe('RankTabsComponent', () => {
  let component: RankTabsComponent;
  let fixture: ComponentFixture<RankTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
