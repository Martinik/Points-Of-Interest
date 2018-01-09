import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication/auth.service';
import { PointsService } from '../services/points.service';
import { Location } from '@angular/common';
import { UsersService } from '../services/users.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class OwnerGuard implements CanActivate {


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService,
    private ps: PointsService,
    private _location: Location,
    private notificationService: NotificationsService 
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    const pointId = route.paramMap.get('id');

    if(this.authService.currentUser){
      return this.checkIfUserCanEdit(this.authService.currentUser, pointId);
    }

    // else current user is undefined (ie. user is not stored in memory)

    return this.getLoggedUserAndMakeChecks(pointId);
   
  }


  getLoggedUserAndMakeChecks(pointId){
    return Promise.resolve(
      this.usersService.getUserById(this.authService.userId).toPromise()
      .then(recievedUser => {
        this.authService.currentUser = recievedUser;
        return this.checkIfUserCanEdit(recievedUser, pointId)
      })
      .catch(e => {
        console.log(`error in guard`);
        console.log(e);
        this.notificationService.error('Access Denied!');
        this._location.back();
        // this.router.navigate(['/home']); 
        // this.notificationService.error('Access Denied!');
        return false;
      })
    )
  }



  checkIfUserCanEdit(user, pointId){
    return Promise.resolve(
      this.ps.getPointById(pointId).toPromise()
        .then(data => {
         
          if (data['_acl']['creator'] === user['_id']) {
            return true;
          }
        
          if (user['isAdmin']) { 
            return true;
          }

          this.notificationService.error('Access Denied!');
          this._location.back();
          
         
          return false;

        })
        .catch(e => {
          console.log(`error in guard`);
          console.log(e);
          this.notificationService.error('Access Denied!');
          this._location.back();
          // this.router.navigate(['/home']);
           
           return false;
        })
    )
  }




}


  




