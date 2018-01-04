import { Injectable,Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Models
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';

const appKey = "kid_ByDhot8GG" // APP KEY HERE;
const appSecret = "e70ea79558764cc586f9a70609801142" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`
const usersBaseUrl = `https://baas.kinvey.com/user/${appKey}` 


@Injectable()
export class AuthenticationService {
  private currentAuthtoken : string;
  private currentUserId : string;
  currentUser: Object;
  @Output() userChanged: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(
    private http : HttpClient
  ) { }

  login(loginModel : LoginModel) {
    return this.http.post(
      loginUrl,
      JSON.stringify(loginModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  changeUser(newUser){
    this.currentUser = newUser;

    this.userChanged.emit(newUser);
  }

  register(registerModel : Object) : Observable<Object> {
    return this.http.post(
      registerUrl, 
      JSON.stringify(registerModel),
      { 
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  logout() {
    return this.http.post(
      logoutUrl,
      {},
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  isLoggedIn() {
    
    // let authtoken : string = localStorage.getItem('authtoken');
    // return authtoken === this.currentAuthtoken;

    // return localStorage.getItem('authtoken') ? true : false;

    //this is not a good way of checking
    //TODO: check by sending GET with the authtoken and seeing if such user exists and matches stored ID
    //TODO: OR create new collection with existing sessions and check there
    let tokenInLocalStorage = localStorage.getItem('authtoken') && localStorage.getItem('authtoken').length > 0;
    let tokenInMemory = this.authtoken && this.authtoken.length > 0;
    let hasAuthToken = tokenInLocalStorage || tokenInMemory;

    let userIdInLocalStorage = localStorage.getItem('userId') && localStorage.getItem('userId').length > 0;
    let userIdInMemory = this.userId && this.userId.length > 0;
    let hasUserId = userIdInLocalStorage || userIdInMemory;
    if (hasAuthToken && hasUserId){
      return true;
    }

    return false;
  }

  get userId() {
    return (this.currentUserId || localStorage.getItem('userId'));
  }

  set userId(value : string) {
    this.currentUserId = value;
  }

  get authtoken() {
    return this.currentAuthtoken || localStorage.getItem('authtoken');
  }

  set authtoken(value : string) {
    this.currentAuthtoken = value;
  }

  private getLoggedUser() : Observable<any>{

    

    let url = `${usersBaseUrl}/${this.userId}`;

    return this.http.get<Object>(url, {headers: this.createAuthHeaders('Kinvey')});
    
  }

  initUser(){
    if(this.isLoggedIn && this.userId){
      return this.getLoggedUser().subscribe(user => this.changeUser(user));
    }
  }

  // userIsLogged(): boolean {
  //   //this is not a good way of checking
  //   //TODO: check by sending GET with the authtoken and seeing if such user exists and matches stored ID
  //   //TODO: OR create new collection with existing sessions and check there

  //   let hasAuthToken = this.authtoken && this.authtoken.length > 0
  //   let hasUserId = this.userId && this.userId.length > 0
  //   if (hasAuthToken && hasUserId){
  //     return true;
  //   }

  //   return false;
  // }

   createAuthHeaders(type : string) : HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        // 'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Authorization': `Kinvey ${this.authtoken}`,
        'Content-Type': 'application/json'
      })
    }
  }
}