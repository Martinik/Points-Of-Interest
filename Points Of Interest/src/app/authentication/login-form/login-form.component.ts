import { Component, Output, EventEmitter } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  public model : LoginModel;
  public loginFail : boolean;
  public username : string;
  @Output() userLoggedIn: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(
    private authService : AuthenticationService,
    private router : Router
  ) {
    this.model = new LoginModel("", "");
    this.username = "";
  }

  login () : void {
    this.authService.login(this.model)
      .subscribe(
        data => {
          this.successfulLogin(data);
        },
        err => {
          this.loginFail = true;
        }
      )
  }

  get diagnostics() : string {
    return JSON.stringify(this.model);
  }

  successfulLogin(data) : void {
    this.authService.authtoken = data['_kmd']['authtoken'];
    this.authService.userId = data['_id'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('userId', data['_id']);
    this.loginFail = false;
    this.router.navigate(['/home']);

    this.authService.changeUser(data);

    // console.log(this.authService.authtoken);
    // console.log(localStorage.getItem('authtoken'));
  }
}
