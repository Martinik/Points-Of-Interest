import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from './../../../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: Object;
  isLoggedIn: boolean;

  constructor(private authService: AuthenticationService) {
    this.isLoggedIn = authService.isLoggedIn();
   }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getLoggedUser();
    this.authService.userChanged.subscribe(newUser => this.loggedUser = newUser);
  }

  getLoggedUser(){
    // if(this.authService.isLoggedIn()){
    //   this.authService.getLoggedUser().subscribe(user => this.loggedUser = user);
    // }

    // this.authService.getLoggedUser().subscribe(user => this.loggedUser = user);

    this.loggedUser = this.authService.currentUser;
  }

  toggleNavDropDown(){
    let navElement = document.getElementById("bs-example-navbar-collapse-1");
    
        // dateBlock.style.visibility = "visible";

        if(navElement.style.display === 'block'){
           navElement.style.display = 'none';
        } else {
          navElement.style.display = 'block';
        }
       
  }

  

}
