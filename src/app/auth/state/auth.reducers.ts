import { HttpErrorResponse } from "@angular/common/http";
import { LoginResponse } from "../data/login.model";
import { createReducer, on } from "@ngrx/store";
import authActions from "./auth.actions";
import { state } from "@angular/animations";

export const authFeatureKey = "Auth";

export interface AuthState {
  // isLoggedIn: boolean;
  loginResponse: LoginResponse | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

const _initialState: AuthState = {
  // isLoggedIn: false,
  loginResponse: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  _initialState,
  on(authActions.login, (state, { login }) => ({
    ...state,
    loading: true,
  })),
  on(authActions.loginSuccess, (state, { loginResponse }) => ({
    ...state,
    loginResponse,
    // isLoggedIn: true,
    loading: false,
  })),
  on(authActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(authActions.loadAuthInfo, (state, { accessToken }) => ({
    ...state,
    loginResponse: { accessToken },
  })),
  on(authActions.logout, (state) => ({
    ...state,
    loading: true,
  })),
  on(authActions.logoutSuccess, (state) => ({
    ...state,
    loading: false,
    loginResponse: null,
  })),
  on(authActions.logoutError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
