import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { AuthenticationService } from '../../../authentication/auth.service';
import { PointsService } from '../../../services/points.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;
  username: string;
  action: string;
  shouldDisplayDetails: boolean;
  shouldDisplayEditForm: boolean;
  userIsOwnerOfProfile: boolean = false;
  

  createdPoints: Object[];
  interests: Object[];
  interestPoints: Object[] = [];
  refreshInterestsCounter: number;
  defaultDisplayArray: string = 'created';
  displayArray: Object[];

  constructor(private route: ActivatedRoute, private service: UsersService, private auth: AuthenticationService, private pointsService: PointsService) {

  }

  ngOnInit() {


    this.username = this.route.snapshot.paramMap.get('username');
    // this.getUser();
    // this.pickAction();


    // this.initArrays();

    this.subscribeToRoute();
  }

  private subscribeToRoute() {
    this.route.params.subscribe(
      params => {
        this.displayArray = undefined;
        this.username = params['username'];
        this.action = params['action'];
        this.getUser();
        this.pickAction();

        
      });
  }


  getUser() {



    this.service.getUserByUsername(this.username)
      .subscribe(foundUsers => this.onGetUserSuccess(foundUsers))
  }

  initArrays() {
    this.service.getUserPoints(this.user['_id'])
      .subscribe(recievedPoints => this.onGetCreatedSuccess(recievedPoints));

    this.service.getUserInterests(this.user['_id'])
      .subscribe(recievedInterests => {
      
        this.onGetInterestsSuccess(recievedInterests)
      });

  }

  onGetCreatedSuccess(recievedPoints) {
    this.createdPoints = recievedPoints;

   

    if (this.defaultDisplayArray === 'created') {
      this.displayArray = this.createdPoints;
    }


  }


  //black magic fuckery goes here...
  onGetInterestsSuccess(recievedInterests) {
    
    this.interests = recievedInterests;

   

    this.refreshInterestsCounter = this.interests.length;

    let tempInterestsArr = this.interests;
   


    for (let interestIndex in tempInterestsArr) {


      this.pointsService.getPointById(tempInterestsArr[interestIndex]['pointId']).subscribe(recPoint => {



        this.interests[interestIndex] = recPoint;

        this.interestPoints.push(recPoint)



        this.onGetInterestPointSuccess();
       
      });
    }


  }

  onGetInterestPointSuccess() {
    this.refreshInterestsCounter--;

    if (this.refreshInterestsCounter <= 0 && this.defaultDisplayArray === 'interests') {
      this.displayArray = this.interestPoints;
     
    }
  }


  pickAction() {

    if (this.action.toLowerCase() === 'edit') {
      this.shouldDisplayEditForm = true;
      this.shouldDisplayDetails = false;
    } else {
      this.shouldDisplayEditForm = false;
      this.shouldDisplayDetails = true;
    }
  }

  onGetUserSuccess(foundUsers) {

    this.user = foundUsers[0];

    console.log(`user changed`);
    console.log(`new user id:`);
    console.log(this.user['_id']);

    if (this.auth.userId === this.user['_id']) {
      this.userIsOwnerOfProfile = true;
    }

    this.initArrays();
  }
}
