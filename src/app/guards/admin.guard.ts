import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication/auth.service';
import { UsersService } from '../services/users.service';
import { Location } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService, 
    private _location: Location,
    private notificationService: NotificationsService 
  ) { }
  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


      if(!this.authService.isLoggedIn){
        this.notificationService.error('You are not an Admin!')
        this._location.back();
        // this.notificationService.error('You are not an Admin!')
        return false;
      }

      if(this.authService.currentUser){
        
        if(this.authService.currentUser['isAdmin']){
          return true;
        } else {
          this.notificationService.error('You are not an Admin!')
          this._location.back();
          // this.notificationService.error('You are not an Admin!')
          return false;
        }

      }

      //if user not stored in memory

      return Promise.resolve(
        this.usersService.getUserById(this.authService.userId).toPromise()
        .then(recievedUser => {
          this.authService.currentUser = recievedUser;
          if(recievedUser['isAdmin']){
            return true;
          }
          this.notificationService.error('You are not an Admin!')
          this._location.back();
          // this.notificationService.error('You are not an Admin!')
          return false;
        })
        .catch(e => {
          console.log(`error in guard`);
          console.log(e);
          
          this._location.back();
          this.notificationService.error('Access Denied!')
          // this.router.navigate(['/home']);
          return false;
        })
      )


  }
}
