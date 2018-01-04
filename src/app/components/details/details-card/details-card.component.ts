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

  constructor(private auth: AuthenticationService, private pointsService: PointsService, private interestsService: InterestsService) { }

  ngOnInit() {
    if (this.point['date'] && this.point['date'].length > 0) {
      this.shouldDisplayDate = true;
    }
    if (this.point['time'] && this.point['time'].length > 0) {
      this.shouldDisplayTime = true;
    }

    this.getInterests();

  }

  addUserToInterested() {
    let currentUserId = this.auth.userId;
    // if (this.point['interestedUsers'] && this.point['interestedUsers'].includes(currentUserId)) {
    //   return;  // user is already interested
    // }

    // this.pointsService.addInterestedUser(currentUserId, this.point)
    //   .subscribe(modifiedPoint => this.onAddRemoveSuccess(modifiedPoint));

    
    this.checkIfUserInterested();

    if (this.userIsInterested) {
      return;
    }

    this.interestIsLoading = true;

    this.interestsService.createInterest(currentUserId, this.point['_id'])
      .subscribe(data => this.onAddInterestSuccess(data));




  }

  removeUserFromInterested() {
    // console.log(`1`);
    let currentUserId = this.auth.userId;
    // if (!(this.point['interestedUsers'].includes(currentUserId))) {
    //   console.log(`user already not interested!`);
    //   return;  // user is already NOT interested
    // }
    // console.log(`2`);
    // this.pointsService.removeInterestedUser(currentUserId, this.point)
    //   .subscribe(modifiedPoint => this.onAddRemoveSuccess(modifiedPoint));

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
    // console.log(`3`);
    // console.log(modifiedPoint);

    // this.point = modifiedPoint;
    // console.log(this.point);
    // this.checkIfUserInterested();
    // this.findInterestCount();
    this.interestIsLoading = false;
    this.getInterests();

  }

  findInterestCount() {
    // console.log(`8`);
    // if (this.point['interestedUsers']) {
    //   this.interestCount = this.point['interestedUsers'].length;
    // } else {
    //   console.log(`point has no array (inside findInterestCount)`);
    //   this.interestCount = 0;
    // }
    // console.log(`9`);

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
    // console.log(`4`);
    // if (!this.point['interestedUsers']) {
    //   console.log(`user has no array of interested users!`);
    //   this.userIsInterested = false;
    //   return;
    // }


    // let currentUserId = this.auth.userId;
    // console.log(`5`);
    // if (currentUserId) {
    //   console.log(`6`);
    //   if (this.point['interestedUsers'].includes(currentUserId)) {
    //     console.log(`userIsInterested set to true`);
    //     this.userIsInterested = true;
    //   } else {
    //     console.log(`userIsInterested set to false`);
    //     this.userIsInterested = false;
    //   }
    //   console.log(`7`);
    // }


    let currentUserId = this.auth.userId;
    let interestsContainingCurrentUser = this.interests.filter(i => i['userId'] === currentUserId);

    this.userIsInterested = (interestsContainingCurrentUser.length > 0)

  }

}
