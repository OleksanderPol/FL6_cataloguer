import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersCategoriesComponent } from './all-users-categories.component';

describe('AllUsersCategoriesComponent', () => {
  let component: AllUsersCategoriesComponent;
  let fixture: ComponentFixture<AllUsersCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUsersCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUsersCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
