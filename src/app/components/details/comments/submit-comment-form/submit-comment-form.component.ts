import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CommentsService } from '../../../../services/comments.service';

@Component({
  selector: 'submit-comment-form',
  templateUrl: './submit-comment-form.component.html',
  styleUrls: ['./submit-comment-form.component.css']
})
export class SubmitCommentFormComponent implements OnInit {

  @Input() pointId: string;
  @Output() submittedComment: EventEmitter<Object> = new EventEmitter<Object>();
  commentForm: FormGroup;

  constructor(private service: CommentsService, private fb: FormBuilder) { 
    this.commentForm = fb.group({
      'comment' : [null, Validators.required]
    })
  }

  ngOnInit() {
  }

  submitComment(formData){

    let payload = {
      content: formData.comment,
      pointId: this.pointId

    }

    this.service.createComment(payload)
      .subscribe(response => this.onCreateSuccess(response))


  }

  onCreateSuccess(response){
    this.commentForm.reset();
    this.submittedComment.emit();
  }

}
