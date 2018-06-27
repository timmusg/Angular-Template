import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { AuthErrorService } from '../auth-error/auth-error.service';
import { ServerLinkService } from '../server-link.service';

@Injectable()
export class ResetPasswordService {
  serverLink: string;

  constructor(
    private http:HttpClient,
    private errorService: AuthErrorService,
    private serverLinkService: ServerLinkService,
  ) {
    this.serverLink = this.serverLinkService.serverURLFunc();
  }

  // *unused method
  // resetPassword(password, token) {
  //   const body = { password, token, link: this.serverLink };
  //   return this.http
  //     .post(`${this.serverLink}/v1/reset-password-in-db`, body)
  //     .map((response: Response) => response )
  //     .catch(error => {
  //       this.errorService.handleError(error.error);
  //       return Observable.throw(error);
  //     });
  // }

}
