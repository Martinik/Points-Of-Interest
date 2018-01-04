import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from '../authentication/auth.service';

const appKey = "kid_ByDhot8GG" // APP KEY HERE;
const appSecret = "e70ea79558764cc586f9a70609801142" // APP SECRET HERE;
const commentsBaseUrl = `https://baas.kinvey.com/appdata/${appKey}/Comments` 
const usersBaseUrl = `https://baas.kinvey.com/user/${appKey}` 



@Injectable()
export class CommentsService {

  constructor(private http : HttpClient, private auth: AuthenticationService) { }

  getCommentsByPointId(pointId: string): Observable<Object[]>{
    // ._acl.creator

    let url = `${commentsBaseUrl}/?query={"pointId":"${pointId}"}&sort={"_kmd.ect": -1}`;

    return this.http.get<Object[]>(url, {headers: this.auth.createAuthHeaders('Kinvey')})
    .catch((e: any) => Observable.throw(this.handleError(e)))
    

  }

  getAuthorById(authorId: string) : Observable<Object>{
    let url = `${usersBaseUrl}/${authorId}`;

    return this.http.get<Object>(url, {headers: this.auth.createAuthHeaders('Kinvey')})
    .catch((e: any) => Observable.throw(this.handleError(e)))
    
  }

  createComment(commentPayload : Object) : Observable<Object> {
    return this.http.post(
      commentsBaseUrl, 
      JSON.stringify(commentPayload),
      { 
        headers: this.auth.createAuthHeaders('Kinvey')
      }
    )
  }

  deleteCommentById(commentId: string) : Observable<Object> {
    let url = `${commentsBaseUrl}/${commentId}`;

    return this.http.delete(url, {headers: this.auth.createAuthHeaders('Kinvey')} )
    .catch((e: any) => Observable.throw(this.handleError(e)));
  }


  handleError(error) {
    //TODO: use toastr for notifications
    console.log(`**ERROR**`);
    console.log(error);
  }


  // private createHeaders(type : string) : HttpHeaders {
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
