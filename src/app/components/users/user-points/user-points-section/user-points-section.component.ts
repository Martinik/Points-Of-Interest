import { Component, OnInit, Input, transition, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { PointsService } from '../../../../services/points.service';
import { AuthenticationService } from '../../../../authentication/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'user-points-section',
  templateUrl: './user-points-section.component.html',
  styleUrls: ['./user-points-section.component.css']
})
export class UserPointsSectionComponent implements OnInit {

  @Input() user: Object;
  
  @Input() createdPoints: Object[];
  @Input() interests: Object[]; 
  @Input() defaultDisplayArray: string;
  @Input() displayArray: Object[];
  userIsOwner: boolean = false;


  refreshInterestsCounter: number;

  // defaultDisplayArray: string = 'created'   // change to alter default view ('created' || 'interests')
  // defaultDisplayArray: string = 'interests'   // change to alter default view ('created' || 'interests')


  constructor(private route: ActivatedRoute, private usersService: UsersService, private pointsService: PointsService, private auth: AuthenticationService) { }

  ngOnInit() {
    console.log('ngonitit user id ');
    console.log(this.user['_id']);
    if (this.user['_id'] === this.auth.userId) {
      this.userIsOwner = true;
    }
    // this.initArrays();
    this.subscribeToRoute();
  }

  private subscribeToRoute() {
    this.route.params.subscribe(
      params => {
        console.log('route change user id ');
        console.log(this.user['_id']);
        
        if (this.user['_id'] === this.auth.userId) {
          this.userIsOwner = true;
        }

        if(this.defaultDisplayArray === 'created'){
          this.changeToCreatedPoints();
        }
        if(this.defaultDisplayArray === 'recreational'){
          this.changeToInterests();
        }
        // this.initArrays();

        // this.linkChanged.emit();
      });
  }

  initArrays() {
    this.usersService.getUserPoints(this.user['_id'])
      .subscribe(recievedPoints => this.onGetCreatedSuccess(recievedPoints));

    this.usersService.getUserInterests(this.user['_id'])
      .subscribe(recievedInterests => {
        // console.log(`........rcintrst`);
        // console.log(recievedInterests);
        this.onGetInterestsSuccess(recievedInterests)
      });

  }


  onGetCreatedSuccess(recievedPoints) {
    this.createdPoints = recievedPoints;

    // console.log(`recieved points:`);
    // console.log(recievedPoints);

    if (this.defaultDisplayArray === 'created') {
      this.displayArray = this.createdPoints;
    }

    // for(let point of this.createdPoints){
    //   point['tempAuthor'] = this.user;
    // }

  }

  //black magic fuckery goes here...
  onGetInterestsSuccess(recievedInterests) {
    // console.log(recievedInterests);
    this.interests = recievedInterests;

    // console.log(`recieved interests:`);
    // console.log(recievedInterests);

    this.refreshInterestsCounter = this.interests.length;

    let tempInterestsArr = this.interests;
    // console.log(`-------------`);
    // console.log(this.interests);
    // console.log(tempInterestsArr);
    // console.log(`-------------`);


    for (let interestIndex in tempInterestsArr) {


      this.pointsService.getPointById(tempInterestsArr[interestIndex]['pointId']).subscribe(recPoint => {



        this.interests[interestIndex] = recPoint;



        this.onGetInterestPointSuccess();
        // console.log(interestIndex);
        // console.log(this.interests);
      });
    }


  }

  onGetInterestPointSuccess() {
    this.refreshInterestsCounter--;

    if (this.refreshInterestsCounter <= 0 && this.defaultDisplayArray === 'interests') {
      this.displayArray = this.interests;
      // console.log(`interests updated!`);
      // console.log(this.interests);
    }
  }



  changeToCreatedPoints() {
    this.displayArray = this.createdPoints;

    let btnCreated = document.getElementById("btnCreated");
    let btnInterests = document.getElementById("btnInterests");

    btnCreated.classList.add("selected-btn");
    btnInterests.classList.remove("selected-btn"); 
  }

  changeToInterests() {
    this.displayArray = this.interests;

    let btnCreated = document.getElementById("btnCreated");
    let btnInterests = document.getElementById("btnInterests");

    btnInterests.classList.add("selected-btn");
    btnCreated.classList.remove("selected-btn"); 
    

  }

}
