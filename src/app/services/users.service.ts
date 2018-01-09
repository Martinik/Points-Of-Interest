import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from '../authentication/auth.service';
import { InterestsService } from './interests.service';

const appKey = "kid_ByDhot8GG" // APP KEY HERE;
const appSecret = "e70ea79558764cc586f9a70609801142" // APP SECRET HERE;
const usersBaseUrl = `https://baas.kinvey.com/user/${appKey}`
const pointsBaseUrl = `https://baas.kinvey.com/appdata/${appKey}/Points`
const interestsBaseUrl = `https://baas.kinvey.com/appdata/${appKey}/Interests`


@Injectable()
export class UsersService {

  constructor(private http: HttpClient, private auth: AuthenticationService, private interestsService: InterestsService) { }


  getUserByUsername(username: string): Observable<Object> {
    let url = `${usersBaseUrl}/?query={"username":"${username}"}`;

    return this.http.get<Object>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
      .catch((e: any) => Observable.throw(this.handleError(e)));
  }

  getAllUsers(): Observable<Object[]>{
    let url = `${usersBaseUrl}`;

    return this.http.get<Object>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
    .catch((e: any) => {
      return Observable.throw(this.handleError(e))
    }
    );
  }

  getUserById(userId: string): Observable<Object> {
    let url = `${usersBaseUrl}/${userId}`;

    return this.http.get<Object>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
      .catch((e: any) => {
        return Observable.throw(this.handleError(e))
      }
      );
  }

  getUserPoints(userId: string): Observable<Object[]> {


    let url = `${pointsBaseUrl}/?query={"_acl.creator":"${userId}"}`;

    return this.http.get<Object[]>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
      .catch((e: any) => Observable.throw(this.handleError(e)))


  }

  deleteUser(userId: string): Observable<Object> {
    let url = `${usersBaseUrl}/${userId}?hard=true`;

    return this.http.delete<Object>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
      .catch((e: any) => {
        return Observable.throw(this.handleError(e))
      }
      );
  }

  deleteUserInterests(userId: string): Observable<Object>{
    
    return this.interestsService.deleteAllInterestsOfUser(userId);
    
  }

  getUserInterests(userId: string): Observable<Object[]> {
    let url = `${interestsBaseUrl}/?query={"userId":"${userId}"}`;

    return this.http.get<Object[]>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
      .catch((e: any) => Observable.throw(this.handleError(e)))
  }

  editUser(userId: string, modifiedModel: Object): Observable<Object> {
    let url = `${usersBaseUrl}/${userId}`;

    return this.http.put<Object>(
      url,
      JSON.stringify(modifiedModel),
      { headers: this.auth.createAuthHeaders('Kinvey') }
    ).catch((e: any) => Observable.throw(this.handleError(e)));
  }




  handleError(error) {
    // console.log('ERROR');
    // console.log(error);
  }


}
