import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from '../authentication/auth.service';

const appKey = "kid_ByDhot8GG" // APP KEY HERE;
const appSecret = "e70ea79558764cc586f9a70609801142" // APP SECRET HERE;
const interestsBaseUrl = `https://baas.kinvey.com/appdata/${appKey}/Interests`


@Injectable()
export class InterestsService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }


  createInterest(userId: string, pointId: string): Observable<Object> {

    let interestModel = {
      userId: userId,
      pointId: pointId
    };

    return this.http.post(
      interestsBaseUrl,
      JSON.stringify(interestModel),
      {
        headers: this.auth.createAuthHeaders('Kinvey')
      }
    );

  }

  deleteInterest(userId: string, pointId: string): Observable<Object> {
    
    // ?query={"type":"${pointType}"}
    
    let url = `${interestsBaseUrl}/?query={"userId":"${userId}", "pointId":"${pointId}"}`;
    
    return this.http.delete<Object>(url, {
      headers: this.auth.createAuthHeaders('Kinvey')
    }).catch((e: any) => Observable.throw(this.handleError(e)));
  }

  deleteAllInterestsOfUser(userId: string): Observable<Object> {
    
    
    let url = `${interestsBaseUrl}/?query={"userId":"${userId}"}`;
    
    return this.http.delete(url, {
      headers: this.auth.createAuthHeaders('Kinvey')
    }).catch((e: any) => Observable.throw(this.handleError(e)));
  }

  getPointInterests(pointId){
    let url = `${interestsBaseUrl}/?query={"pointId":"${pointId}"}`;
    
        return this.http.get<Object[]>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
          .catch((e: any) => Observable.throw(this.handleError(e)))
    
  }



  handleError(error) {
    // console.log(`ERROR`);
    // console.log(error);
  }



}
