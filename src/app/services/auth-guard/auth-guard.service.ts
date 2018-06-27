import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate() {
    let token = localStorage.getItem('token');
    if(token) {
      return true;
    } else {
      return false;
    }
  }

}
