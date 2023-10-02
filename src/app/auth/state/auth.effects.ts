import { Injectable, inject } from "@angular/core";
import { AuthService } from "../data/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import authActions from "./auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { tokenKey } from "../../utils/token.utils";

Injectable();
export class AuthEffects {
  private authService = inject(AuthService);
  private actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap((action) =>
        this.authService.login(action.login).pipe(
          map((loginResponse) => {
            localStorage.setItem(tokenKey, loginResponse.accessToken);
            return authActions.loginSuccess({ loginResponse });
          }),
          catchError((error) => of(authActions.loginFailure(error)))
        )
      )
    )
  );

  logout = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      map(() => {
        localStorage.removeItem(tokenKey);
        return authActions.logoutSuccess();
      }),
      catchError((error) => of(authActions.logoutError(error)))
    )
  );
}
