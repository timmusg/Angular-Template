import {EventEmitter, Injectable} from '@angular/core';
import { ApiCallService } from '../api-call.service';

import { AbstractControl } from '@angular/forms';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user.model';


@Injectable()
export class AuthenticationService {

  public signedin: boolean = false;
  public signinEmitter = new EventEmitter<any>();

  constructor(
    private apiCallService: ApiCallService
  ) {}

  signup(user: User, application) {
    const body = {user, application};
    return this.apiCallService.makePostRequest(`/v1/user/signup`, body)
      .map((response: Response) => response )
  }

  login(user: User) {
    const body = JSON.stringify(user);
    return this.apiCallService.makePostRequest(`/v1/user/login`, body)
      .map(response => {
        this.signedin = true;
        this.signinEmitter.emit(this.signedin);
        return response;
      })
  }

  loginGoogle(email, first_name, last_name) {
    return this.apiCallService.makePostRequest(`/v1/user/login/google`, {email, first_name, last_name})
      .map(response => response)
  }

  resetPassword(password, token) {
    const body = { password, token };
    return this.apiCallService.makePostRequest(`/v1/reset-password-in-db`, body)
    .map((response: Response) => response )
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  setLocalStorage(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('email', data.email);
    localStorage.setItem('settings', JSON.stringify(data.settings));
  }

  MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirmPassword').value;
    if(password != confirmPassword) {
      AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
      return null
    }
  }

  getSigninStatus() {
    return true;
  }

}
