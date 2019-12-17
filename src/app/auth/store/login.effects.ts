import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/core/services/user.service';
import { LoginActions, LoginActionTypes, LoginSuccess } from './login.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LoginEffects {

  doLogin$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActionTypes.LoginAction),
    switchMap((action) => this.userService.loginWithRedux(action.payload)),
    map((user) => new LoginSuccess(user)),
    catchError(() => {
      return of({ type: LoginActionTypes.LoginFailureAction });
    })
  ));

  constructor(
    private actions$: Actions<LoginActions>,
    private userService: UserService
  ) { }
}
