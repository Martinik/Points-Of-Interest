import { Component, OnInit, Input, Output } from '@angular/core';
import { CommentsService } from '../../../../services/comments.service';
import { UsersService } from '../../../../services/users.service';
import { AuthenticationService } from '../../../../authentication/auth.service';

@Component({
  selector: 'comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit {

  @Input() pointId: string;
  comments: any[];
  userIsAdmin: boolean = false;

  constructor(private service: CommentsService, private usersService: UsersService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.CheckIfUserAdmin();
    this.getComments();

  }

  CheckIfUserAdmin(){
    this.usersService.getUserById(this.auth.userId)
    .subscribe(recUser => {
      if(recUser['isAdmin']){
        this.userIsAdmin = true;
      }
    })
  }

  getComments(){
    this.service.getCommentsByPointId(this.pointId)
    .subscribe(recievedComments => {this.handleGetCommentsSuccess(recievedComments)});
  }

  private handleGetCommentsSuccess(recievedComments) {
    this.comments = recievedComments;
  }

  handleCommentSubmit(recievedEvent){
    this.comments = undefined;
    this.getComments();
    
  }

  handleCommentDeletion(deletedComment){
    // this.comments = undefined;
    // this.getComments();

    this.comments = this.comments.filter(c => c._id !== deletedComment._id);
  }

}
