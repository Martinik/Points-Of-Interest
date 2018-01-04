import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from '../authentication/auth.service';

const appKey = "kid_ByDhot8GG" // APP KEY HERE;
const appSecret = "e70ea79558764cc586f9a70609801142" // APP SECRET HERE;
const usersBaseUrl = `https://baas.kinvey.com/user/${appKey}` 


@Injectable()
export class UsersService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }


  getUserByUsername(username: string) : Observable<Object>{
    let url = `${usersBaseUrl}/?query={"username":"${username}"}`;

    return this.http.get<Object>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
    .catch((e: any) => Observable.throw(this.handleError(e)));
  }

  editUser(userId: string, modifiedModel: Object) : Observable<Object> {
    let url = `${usersBaseUrl}/${userId}`;

    return this.http.put<Object>(
      url,
      JSON.stringify(modifiedModel),
      { headers: this.auth.createAuthHeaders('Kinvey') }
    ).catch((e: any) => Observable.throw(this.handleError(e)));
  }




  handleError(error) {
    //TODO: use toastr for notifications
    console.log(`ERROR`);
    console.log(error);
  }


  // private createHeaders(type: string): HttpHeaders {
  //   if (type === 'Basic') {
  //     return new HttpHeaders({
  //       'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
  //       'Content-Type': 'application/json'
  //     })
  //   } else {
  //     return new HttpHeaders({
  //       'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
  //       'Content-Type': 'application/json'
  //     })
  //   }
  // }

}
