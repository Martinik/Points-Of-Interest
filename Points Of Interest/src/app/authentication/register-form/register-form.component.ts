import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { LoginModel } from '../models/login.model';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  public model: RegisterModel;
  public registeredUser: string;
  public registerSuccess: boolean;
  public registerFail: boolean;

  constructor(
    private authService: AuthenticationService,
    private router : Router
  ) {
    this.model = new RegisterModel("", "", "", "");
  }

  register(): void {

    let registerSubmitModel = {
      username: this.model.username,
      name: this.model.name,
      email: this.model.email,
      password: this.model.password
    }

    this.authService.register(registerSubmitModel)
      .subscribe(
      data => {
        this.successfulRegister(data);
      },
      err => {
        this.registerFail = true;
      }
      )
  }

  get diagnostics(): string {
    return JSON.stringify(this.model);
  }

  successfulRegister(data): void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];


    console.log(data);

    let loginModel: LoginModel = {
      username: this.registeredUser,
      password: data['password']
    }


    this.router.navigate(['/login']);
  }
}
