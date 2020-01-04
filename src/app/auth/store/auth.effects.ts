import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/core/services/user.service';
import { AuthActions, AuthActionTypes, LoginSuccess } from './auth.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  doLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LoginAction),
    switchMap(action => this.userService.loginWithRedux(action.payload)),
    map((user) => new LoginSuccess(user)),
    catchError(() => of({ type: AuthActionTypes.LoginFailureAction }))
  ));

  constructor(
    private actions$: Actions<AuthActions>,
    private userService: UserService
  ) { }
}
