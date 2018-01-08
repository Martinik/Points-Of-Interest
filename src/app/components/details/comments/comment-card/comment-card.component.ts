import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentsService } from '../../../../services/comments.service';
import { AuthenticationService } from '../../../../authentication/auth.service';

@Component({
  selector: 'comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit {

  @Input() comment: any;
  @Input() userIsAdmin: boolean;
  @Output() commentDeleted: EventEmitter<Object> = new EventEmitter<Object>();
  commentAuthor: any;
  userIsAuthor: boolean = false;

  constructor(private service: CommentsService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getAuthor();
  }


  getAuthor(){
    this.service.getAuthorById(this.comment._acl.creator)
    .subscribe(author => this.onGetAuthorSuccess(author));
  }

  onGetAuthorSuccess(author){
    this.commentAuthor = author;
    this.userIsAuthor = (this.commentAuthor._id === this.auth.userId);
    console.log(this.commentAuthor._id + '   ???  ' + this.auth.userId);
  }

  deleteComment(){

    if (confirm("Are you sure you want to delete this comment?") == true) {
      this.service.deleteCommentById(this.comment._id)
      .subscribe(response => this.onDeleteCommentSuccess(response))
    } 

   
  }

  onDeleteCommentSuccess(response){
    this.commentDeleted.emit(this.comment);
  }

}
