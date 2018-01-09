import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route
} from '@angular/router';

import { AuthenticationService } from '../authentication/auth.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService : AuthenticationService,
    private router : Router,
    private notificationService: NotificationsService 
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }
  
  checkLoggedIn(url : string) : boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    this.notificationService.error('You must be logged in to access this page!')
    return false;
  }
}