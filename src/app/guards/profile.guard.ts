import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication/auth.service';
import { Location } from '@angular/common';
import { UsersService } from '../services/users.service';

@Injectable()
export class ProfileGuard implements CanActivate {


  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private router: Router,
    private _location: Location
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    const username = route.paramMap.get('username');
    const action = route.paramMap.get('action');

      console.log(`username`);
      console.log(username);
      console.log(`action`);
      console.log(action);
      console.log(`current user id`);
      console.log(this.authService.userId);

    if (action === 'edit') {
      return this.checkIfUserHasEditRights(username)
    }

    return true;

  }


  checkIfUserHasEditRights(username) {

    if (this.authService.currentUser) {

      return this.checkUser(this.authService.currentUser, username)

    }

    //else

    return Promise.resolve(
      this.usersService.getUserById(this.authService.userId).toPromise()
        .then(loggedUser => {
          console.log(`recieved user`);
          console.log(loggedUser);
          this.authService.currentUser = loggedUser;
          return this.checkUser(loggedUser, username);
                    
        })
        .catch(e => {

          this._location.back(); 
          return false;
        })
    )

  }


  checkUser(user, linkUsername) : boolean {

    console.log(user);
    console.log(linkUsername);
    if (user['isAdmin']) {
      return true;
    }
    if (user['username'] === linkUsername) {
      return true;
    }

    this._location.back();
    return false;
  }
}
