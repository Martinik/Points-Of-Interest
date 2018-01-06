import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPracticalComponent } from './edit-practical.component';

describe('EditPracticalComponent', () => {
  let component: EditPracticalComponent;
  let fixture: ComponentFixture<EditPracticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPracticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPracticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
