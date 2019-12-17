import { Action } from '@ngrx/store';
import { RequestAuth } from 'src/app/core/models/auth';

export enum LoginActionTypes {
  LoginAction = '[Login] Action',
  LoginSuccessAction = '[Login] LoginSuccessAction',
  LoginFailureAction = '[Login] LoginFailureAction',
  LoginRedirectAction = '[Login] LoginRedirectAction',
  LogoutAction = '[Login] LogoutAction'
}

export class Login implements Action {
  readonly type = LoginActionTypes.LoginAction;

  constructor(public payload: RequestAuth) {}
}

export class LoginSuccess implements Action {
  readonly type = LoginActionTypes.LoginSuccessAction;

  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = LoginActionTypes.LoginFailureAction;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = LoginActionTypes.LoginRedirectAction;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LoginActionTypes.LogoutAction;

  constructor(public payload: any) {}
}

export type LoginActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;
