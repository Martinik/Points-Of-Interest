import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecreationalComponent } from './edit-recreational.component';

describe('EditRecreationalComponent', () => {
  let component: EditRecreationalComponent;
  let fixture: ComponentFixture<EditRecreationalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecreationalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecreationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
