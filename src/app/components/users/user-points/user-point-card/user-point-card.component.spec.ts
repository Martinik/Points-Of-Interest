import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPointCardComponent } from './user-point-card.component';

describe('UserPointCardComponent', () => {
  let component: UserPointCardComponent;
  let fixture: ComponentFixture<UserPointCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPointCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPointCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
