import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPointsSectionComponent } from './user-points-section.component';

describe('UserPointsSectionComponent', () => {
  let component: UserPointsSectionComponent;
  let fixture: ComponentFixture<UserPointsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPointsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPointsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
