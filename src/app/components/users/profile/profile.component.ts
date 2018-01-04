import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { AuthenticationService } from '../../../authentication/auth.service';

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

  constructor(private route: ActivatedRoute, private service: UsersService, private auth: AuthenticationService) { 
    
  }

  ngOnInit() {


    this.username = this.route.snapshot.paramMap.get('username');
    // this.getUser();
    // this.pickAction();


    this.subscribeToRoute();
  }

  private subscribeToRoute() {
    this.route.params.subscribe(
      params => {
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

    if (this.auth.userId === this.user['_id']) {
      this.userIsOwnerOfProfile = true;
    }
  }
}
