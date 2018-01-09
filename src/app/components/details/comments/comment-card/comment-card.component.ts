import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentsService } from '../../../../services/comments.service';
import { AuthenticationService } from '../../../../authentication/auth.service';
import { NotificationsService } from 'angular2-notifications';

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
  authorIsDeleted: boolean; 

  constructor(private service: CommentsService, private auth: AuthenticationService, private notificationService: NotificationsService) { }

  ngOnInit() {
    this.getAuthor();
  }


  getAuthor(){
    this.service.getAuthorById(this.comment._acl.creator)
    .subscribe(author => this.onGetAuthorSuccess(author), error => this.onGetAuthorFail(error));
  }

  onGetAuthorSuccess(author){
    this.commentAuthor = author;
    this.userIsAuthor = (this.commentAuthor._id === this.auth.userId);
    console.log(this.commentAuthor._id + '   ???  ' + this.auth.userId);
  }

  onGetAuthorFail(error){
    this.commentAuthor = {
      username: '[user deleted]'
    }
    this.userIsAuthor = false;
    this.authorIsDeleted = true;
  }

  deleteComment(){

    if (confirm("Are you sure you want to delete this comment?") == true) {
      this.service.deleteCommentById(this.comment._id)
      .subscribe(response => this.onDeleteCommentSuccess(response))
    } 
 
   
  }

  onDeleteCommentSuccess(response){
    this.commentDeleted.emit(this.comment);
    this.notificationService.success('Comment Deleted');
  }

}
