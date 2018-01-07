import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from '../authentication/auth.service';

const appKey = "kid_ByDhot8GG" // APP KEY HERE;
const appSecret = "e70ea79558764cc586f9a70609801142" // APP SECRET HERE;
const pointsBaseUrl = `https://baas.kinvey.com/appdata/${appKey}/Points`
const usersBaseUrl = `https://baas.kinvey.com/user/${appKey}`
const interestsBaseUrl = `https://baas.kinvey.com/appdata/${appKey}/Interests`


@Injectable()
export class PointsService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getCreatorById(userId: string): Observable<Object> {
    let url = `${usersBaseUrl}/${userId}`;

    return this.http.get<Object>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
      .catch((e: any) => Observable.throw(this.handleError(e)))

  }

  create(pointModel: any): Observable<Object> {
    return this.http.post(
      pointsBaseUrl,
      JSON.stringify(pointModel),
      {
        headers: this.auth.createAuthHeaders('Kinvey')
      }
    )
  }

  editPoint(pointId, modifiedModel: Object): Observable<Object> {
    let url = `${pointsBaseUrl}/${pointId}`;

    return this.http.put<Object>(
      url,
      JSON.stringify(modifiedModel),
      { headers: this.auth.createAuthHeaders('Kinvey') }
    ).catch((e: any) => Observable.throw(this.handleError(e)));


  }

  deletePointInterests(pointId: string): Observable<Object> {
    
    // ?query={"type":"${pointType}"}
    
    let url = `${interestsBaseUrl}/?query={"pointId":"${pointId}"}`;
    
    return this.http.delete<Object>(url, {
      headers: this.auth.createAuthHeaders('Kinvey')
    }).catch((e: any) => Observable.throw(this.handleError(e)));
  }

  deletePointById(pointId: string) : Observable<Object> {
    let url = `${pointsBaseUrl}/${pointId}`;

    return this.http.delete(url, {headers: this.auth.createAuthHeaders('Kinvey')} )
    .catch((e: any) => Observable.throw(this.handleError(e)));
  }

  getPointInterests(pointId){
    let url = `${interestsBaseUrl}/?query={"pointId":"${pointId}"}`;
    
        return this.http.get<Object[]>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
          .catch((e: any) => Observable.throw(this.handleError(e)))
    
  }



  getAllPoints(): Observable<Object[]> {

    return this.http.get<Object[]>(pointsBaseUrl, { headers: this.auth.createAuthHeaders('Kinvey') })
      .catch((e: any) => Observable.throw(this.handleError(e)))

  }

  getPointsByType(pointType: String): Observable<Object[]> {

    let url = `${pointsBaseUrl}/?query={"type":"${pointType}"}`;

    return this.http.get<Object[]>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
      .catch((e: any) => Observable.throw(this.handleError(e)))

  }

  getPointById(id: String): Observable<Object> {

    let url = `${pointsBaseUrl}/${id}`;

    return this.http.get<Object[]>(url, { headers: this.auth.createAuthHeaders('Kinvey') })
      .catch((e: any) => Observable.throw(this.handleError(e)))

  }

  addInterestedUser(userId: string, point: Object): Observable<Object> {

    let url = `${pointsBaseUrl}/${point['_id']}`;

    let updatedPoint = point;

    if (!updatedPoint['interestedUsers']) {
      updatedPoint['interestedUsers'] = [];
    }

    updatedPoint['interestedUsers'].push(userId);

    return this.http.put<Object>(
      url,
      JSON.stringify(updatedPoint),
      { headers: this.auth.createAuthHeaders('Kinvey') }
    ).catch((e: any) => Observable.throw(this.handleError(e)));

  }


  removeInterestedUser(userId: string, point: Object): Observable<Object> {

    let url = `${pointsBaseUrl}/${point['_id']}`;

    let updatedPoint = point;

    // if the point doesnt have the property, create it and submit it empty
    if (!updatedPoint['interestedUsers']) {
      updatedPoint['interestedUsers'] = [];

      return this.http.put<Object>(
        url,
        JSON.stringify(updatedPoint),
        { headers: this.auth.createAuthHeaders('Kinvey') }
      ).catch((e: any) => Observable.throw(this.handleError(e)));

    }

    let idIndex = updatedPoint['interestedUsers'].indexOf(userId);

    if (idIndex > -1) {
      updatedPoint['interestedUsers'].splice(idIndex, 1);
    }

    return this.http.put<Object>(
      url,
      JSON.stringify(updatedPoint),
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
