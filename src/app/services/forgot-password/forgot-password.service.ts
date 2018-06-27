import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { ApiCallService } from '../api-call.service';

@Injectable()
export class ForgotPasswordService {
  serverLink: string;

  constructor(
    private apiCallService: ApiCallService,
  ) {}

  sendEmail(email) {
    const body = { email, link: this.serverLink };
    return this.apiCallService.makePostRequest(`/v1/reset-password-email`, body)
    .map(response => response )
  }

}


