import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchItemsComponent } from './global-search-items.component';

describe('GlobalSearchItemsComponent', () => {
  let component: GlobalSearchItemsComponent;
  let fixture: ComponentFixture<GlobalSearchItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalSearchItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSearchItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
