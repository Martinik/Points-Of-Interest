import { Component, OnInit, Input, Output } from '@angular/core';
import { CommentsService } from '../../../../services/comments.service';

@Component({
  selector: 'comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit {

  @Input() pointId: string;
  comments: any[];

  constructor(private service: CommentsService) { }

  ngOnInit() {
    this.getComments();

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
