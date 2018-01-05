import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../../authentication/auth.service'
import { PointsService } from '../../../services/points.service'
import { InterestsService } from '../../../services/interests.service'


@Component({
  selector: 'details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css']
})
export class DetailsCardComponent implements OnInit {

  @Input() point: Object;
  shouldDisplayTime: boolean = false;
  shouldDisplayDate: boolean = false;
  userIsInterested: boolean = false;
  interests: Object[];
  interestCount: number;
  interestIsLoading: boolean = true; 
  userIsCreator: boolean = false;

  constructor(private auth: AuthenticationService, private pointsService: PointsService, private interestsService: InterestsService) { }

  ngOnInit() {
    if (this.point['date'] && this.point['date'].length > 0) {
      this.shouldDisplayDate = true;
    }
    if (this.point['time'] && this.point['time'].length > 0) {
      this.shouldDisplayTime = true;
    }

    this.getInterests();
    this.getCreator();

  }

  getCreator(){
    this.pointsService.getCreatorById(this.point['_acl']['creator'])
    .subscribe(user => {
      if(user['_id'] === this.auth.userId){
        this.userIsCreator = true;
      }
    })
  }

  addUserToInterested() {
    let currentUserId = this.auth.userId;
   
    this.checkIfUserInterested();

    if (this.userIsInterested) {
      return;
    }

    this.interestIsLoading = true;

    this.interestsService.createInterest(currentUserId, this.point['_id'])
      .subscribe(data => this.onAddInterestSuccess(data));


  }

  removeUserFromInterested() {
    
    let currentUserId = this.auth.userId;
 
    this.checkIfUserInterested();

    if (!this.userIsInterested) {
      return;
    }

    this.interestIsLoading = true;

    this.interestsService.deleteInterest(currentUserId, this.point['_id'])
      .subscribe(data => this.onRemoveInterestSuccess(data));


  }

  onRemoveInterestSuccess(data){

    this.interestCount--;
    this.userIsInterested = false;

    this.onAddRemoveSuccess(data);
  }
  onAddInterestSuccess(data){

    this.interestCount++;
    this.userIsInterested = true;
    
    this.onAddRemoveSuccess(data); 
  }

  onAddRemoveSuccess(data) {
 
    this.interestIsLoading = false;
    this.getInterests();

  }

  findInterestCount() {
  
    this.interestCount = this.interests.length;
  }

  getInterests() {
    this.interestsService.getPointInterests(this.point['_id']).subscribe(interests => this.onGetInterestsSuccess(interests));
  }

  onGetInterestsSuccess(interests) {

    this.interestIsLoading = false;
    
    this.interests = interests

    this.checkIfUserInterested();

    this.findInterestCount();
  }

  checkIfUserInterested() {
  
    let currentUserId = this.auth.userId;
    let interestsContainingCurrentUser = this.interests.filter(i => i['userId'] === currentUserId);

    this.userIsInterested = (interestsContainingCurrentUser.length > 0)

  }

}
