import { LoginActions, LoginActionTypes } from './login.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
  auth: any;
  error: string;
  isLogging: boolean;
  isLogged: boolean;
}

export const initialState: AuthState = {
  auth: null,
  error: '',
  isLogging: false,
  isLogged: false
};


export function reducer(state = initialState, action: LoginActions): AuthState {
  switch (action.type) {
    case LoginActionTypes.LoginAction: {
      return Object.assign({}, state, { auth: action.payload, isLogging: true, error: '' });
    }
    case LoginActionTypes.LoginSuccessAction: {
      return Object.assign({}, state, {
        auth: action.payload,
        isLogging: false,
        isLogged: true,
        error: ''
      });
    }
    case LoginActionTypes.LoginFailureAction: {
      return Object.assign({}, state, {
        auth: {},
        isLogging: false,
        isLogged: false,
        error: 'La contraseña introducida para el usuario no es correcta'
      });
    }
    case LoginActionTypes.LogoutAction: {
      return {
        ...state,
        auth: null,
        isLogging: false,
        isLogged: false
      };
    }
  }
}

export const selectLoginState = createFeatureSelector<AuthState>('login');

export const getLoggedIn = createSelector(selectLoginState, (state: AuthState) => state.isLogged);

export const getError = createSelector(selectLoginState, (state: AuthState) => state.error);

export const selectAuth = createSelector(selectLoginState, (state: AuthState) => {
  if (state) {
    return state.auth;
  }
  return null;
});
