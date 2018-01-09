import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUser: Object;

  constructor(private auth: AuthenticationService, private usersService: UsersService) { }

  ngOnInit() {
    if (!this.auth.currentUser){
      this.getLoggedUser();
    } else {
      this.loggedUser = this.auth.currentUser;
    }
  }

  getLoggedUser(){
    this.usersService.getUserById(this.auth.userId)
    .subscribe(user => this.loggedUser = user);
  }

  

}
