// MODO VIEJUNO DE DEFINIR LAS ACCIONES versiones < 7.x
import { Action } from '@ngrx/store';
import { RequestAuth } from 'src/app/core/models/auth';

export enum AuthActionTypes {
  LoginAction = '[Login] Action',
  LoginSuccessAction = '[Login] LoginSuccessAction',
  LoginFailureAction = '[Login] LoginFailureAction',
  LoginRedirectAction = '[Login] LoginRedirectAction',
  LogoutAction = '[Login] LogoutAction'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: RequestAuth) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccessAction;

  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailureAction;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirectAction;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;

  constructor(public payload: any) {}
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;
