import { Component, Output, EventEmitter } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  public model : LoginModel;
  public loginFail : boolean;
  public username : string;
  isLoading = false;
  @Output() userLoggedIn: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(
    private authService : AuthenticationService,
    private router : Router,
    private notificationService: NotificationsService 
  ) {
    this.model = new LoginModel("", "");
    this.username = "";
  }

  login () : void {
    this.isLoading = true;
    this.authService.login(this.model)
      .subscribe(
        data => {
          this.successfulLogin(data);
        },
        err => {
          this.isLoading = false;
          this.loginFail = true;
        }
      )
  }

  get diagnostics() : string {
    return JSON.stringify(this.model);
  }

  successfulLogin(data) : void {
    this.isLoading = false;
    this.authService.authtoken = data['_kmd']['authtoken'];
    this.authService.userId = data['_id'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('userId', data['_id']);
    this.loginFail = false;
    this.router.navigate(['/home']);
    this.notificationService.success('Login Success!')
    this.authService.changeUser(data);

    // console.log(this.authService.authtoken);
    // console.log(localStorage.getItem('authtoken'));
  }
}
