import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication/auth.service';
import { PointsService } from '../services/points.service';
import { Location } from '@angular/common';
import { UsersService } from '../services/users.service';

@Injectable()
export class OwnerGuard implements CanActivate {


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService,
    private ps: PointsService,
    private _location: Location
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
        
        this._location.back();
        // this.router.navigate(['/home']);
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
          console.log(`GUARD -> current user id `);
          console.log(user['userId']);
          console.log('creator:');
          console.log(data['_acl']['creator']);
          if (user['isAdmin']) { 
            return true;
          }

          this._location.back();
          // this.router.navigate(['/home']);
          console.log(`unauthorised!`);

          return false;

        })
        .catch(e => {
          console.log(`error in guard`);
          console.log(e);
          
          this._location.back();
          // this.router.navigate(['/home']);
          return false;
        })
    )
  }




}


  




