import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators'

import * as userActions from '../actions/user.action';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService
  ) {}

  @Effect()
  loadUserData = this.actions.ofType(userActions.LOAD_USER_DATA)
    // .pipe(
    //   switchMap(() => {
    //     // return this.authenticationService.setLocalStorage()
    //   })
    // )
}
