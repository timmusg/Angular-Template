import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class TwoFactorConfigGuardService implements CanActivate {

  canActivate() {
    let config = localStorage.getItem('two_factor_config');
    if(config) {
      return true;
    } else {
      return false;
    }
  }

}
