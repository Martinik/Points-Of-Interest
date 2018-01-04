import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCommentFormComponent } from './submit-comment-form.component';

describe('SubmitCommentFormComponent', () => {
  let component: SubmitCommentFormComponent;
  let fixture: ComponentFixture<SubmitCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
