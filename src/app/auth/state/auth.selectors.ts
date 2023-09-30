import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./auth.reducers";
import { tokenUtils } from "src/app/utils/token.utils";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectLoginResponseState = createSelector(
  selectAuthState,
  (state) => state.loginResponse
);

export const selectLoginState = createSelector(selectAuthState, (state) => {
  const accessToken = state.loginResponse?.accessToken;
  if (accessToken) {
    const isExpired = tokenUtils.isTokenExpired(accessToken);
    return !isExpired;
  }
  return false;
});

export const selectUserInfo = createSelector(
  selectAuthState,
  selectLoginState,
  (state, isLoggedIn) => {
    if (!isLoggedIn) return null;
    const accessToken = state.loginResponse?.accessToken;
    if (!accessToken) return null;
    const userInfo = tokenUtils.getUserFromToken(accessToken);
    return userInfo;
  }
);

export const selectLoginLoadingState = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectLoginErrorState = createSelector(
  selectAuthState,
  (state) => state.error
);
