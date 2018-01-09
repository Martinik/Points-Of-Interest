import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPointCardComponent } from './admin-point-card.component';

describe('AdminPointCardComponent', () => {
  let component: AdminPointCardComponent;
  let fixture: ComponentFixture<AdminPointCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPointCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPointCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
