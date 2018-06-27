import { ServerLinkService } from './server-link.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthErrorService } from '../../app/services/auth-error/auth-error.service';

@Injectable()
export class ApiCallService {
  public serverLink: string;

  constructor(
    private http: HttpClient,
    private serverLinkService: ServerLinkService,
    private authErrorService: AuthErrorService
  ) {
    this.serverLink = this.serverLinkService.serverURLFunc();
  }

  makeGetRequest(route): Observable<any> {
    return this.http.get(`${this.serverLink}${route}`,{headers: this.getHeaders()})
    .catch((error: Response) => {
      this.authErrorService.handleError(error);
      return Observable.throw(error)
    })
    .map(res => res);
  }

  makePostRequest(route, body): Observable<any> {
    return this.http.post(`${this.serverLink}${route}`, body, {headers: this.getHeaders()})
    .catch((error: Response) => {
      this.authErrorService.handleError(error);
      return Observable.throw(error)
    })
    .map(res => res);
  }

  getHeaders() {
    let headersConfig = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
    return new HttpHeaders(headersConfig);
  }
}
