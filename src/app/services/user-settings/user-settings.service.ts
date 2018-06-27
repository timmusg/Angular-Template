import { Injectable, EventEmitter } from '@angular/core';
import { ApiCallService } from '../api-call.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserSettingsService {
  public serverLink: string;
  public two_factor_qrcode: string = '';
  public two_factor_secret: string = '';
  public qrcodeEmitter = new EventEmitter<any>();

  constructor(
    private apiCallService: ApiCallService
  ) {}

  toggleSetting(setting: string): Observable<any>{
    let email = localStorage.getItem('email');
    return this.apiCallService.makePostRequest(`/v1/user/toggleSetting`, {setting, email})
    .map(res => {
      this.two_factor_qrcode = res.qrcode;
      this.two_factor_secret = res.secret;
      this.qrcodeEmitter.emit(this.two_factor_qrcode);
      return res;
    });
  }

  confirmCode(code: string, email: string, initial: boolean): Observable<any>{
    return this.apiCallService.makePostRequest(`/v1/user/confirmCode`, {two_factor_secret: this.two_factor_secret, code, email, initial})
    .map(res => res);
  }

  getQRCode() {
    return this.two_factor_qrcode;
  }
}
