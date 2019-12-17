import { AuthActions, AuthActionTypes } from './auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const authFeatureKey = 'auth';

export interface AuthState {
  auth: any;
  error: string;
  isLogging: boolean;
  isLogged: boolean;
}

export const initialAuthState: AuthState = {
  auth: null,
  error: '',
  isLogging: false,
  isLogged: false
};


export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction: {
      return Object.assign({}, state, { auth: action.payload, isLogging: true, error: '' });
    }
    case AuthActionTypes.LoginSuccessAction: {
      return Object.assign({}, state, {
        auth: action.payload,
        isLogging: false,
        isLogged: true,
        error: ''
      });
    }
    case AuthActionTypes.LoginFailureAction: {
      return Object.assign({}, state, {
        auth: {},
        isLogging: false,
        isLogged: false,
        error: 'La contraseña introducida para el usuario no es correcta'
      });
    }
    case AuthActionTypes.LogoutAction: {
      return {
        ...state,
        auth: null,
        isLogging: false,
        isLogged: false
      };
    }
  }
}

export const selectLoginState = createFeatureSelector<AuthState>(authFeatureKey);

export const getLoggedIn = createSelector(selectLoginState, (state: AuthState) => state.isLogged);

export const getError = createSelector(selectLoginState, (state: AuthState) => state.error);

export const selectAuth = createSelector(selectLoginState, (state: AuthState) => {
  if (state) {
    return state.auth;
  }
  return null;
});
