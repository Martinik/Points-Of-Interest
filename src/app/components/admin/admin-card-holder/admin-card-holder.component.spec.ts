import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCardHolderComponent } from './admin-card-holder.component';

describe('AdminCardHolderComponent', () => {
  let component: AdminCardHolderComponent;
  let fixture: ComponentFixture<AdminCardHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCardHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCardHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
