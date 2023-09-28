import { createAction, props } from "@ngrx/store";
import { LoginModel, LoginResponse } from "../data/login.model";
import { HttpErrorResponse } from "@angular/common/http";

const login = createAction("[Auth] Login", props<{ login: LoginModel }>());

const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ loginResponse: LoginResponse }>()
);

const loginFailure = createAction(
  "[Auth] Login Failure",
  props<{ error: HttpErrorResponse }>()
);

// TODO: add logout actions

const loadAuthInfo = createAction(
  "[Auth] Load Auth Info",
  props<{ accessToken: string }>()
);

const logout = createAction("[Auth] Logout");
const logoutSuccess = createAction("[Auth] Logut Success");
const logoutError = createAction(
  "[Auth] Logut Error",
  props<{ error: HttpErrorResponse }>()
);

const authActions = {
  login,
  loginSuccess,
  loginFailure,
  loadAuthInfo,
  logout,
  logoutSuccess,
  logoutError,
};
export default authActions;
