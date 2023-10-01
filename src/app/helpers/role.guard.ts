import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import {
  selectLoginLoadingState,
  selectLoginState,
  selectUserInfo,
} from "../auth/state/auth.selectors";
import { of, tap } from "rxjs";

export const roleGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const { roles } = route.data;
  const requiredRoles: string[] = roles;
  const userInfo$ = store.select(selectUserInfo);
  var isLoggedIn = false;
  store
    .select(selectLoginState)
    .pipe(
      tap((val) => {
        isLoggedIn = val;
      })
    )
    .subscribe();
  if (!isLoggedIn) {
    router.navigate(["/auth/login"]);
    return false;
  }

  userInfo$
    .pipe(
      tap((userInfo) => {
        console.log({ userInfo });
        if (!userInfo) {
          router.navigate(["/auth/login"]);
          return of(false);
        }
        const roles = userInfo?.roles;
        const hasRequiredRole = requiredRoles.some((role) =>
          roles?.includes(role)
        );
        if (!hasRequiredRole) {
          router.navigate(["/unauthorized"]);
          return of(false);
        }
        return of(true);
      })
    )
    .subscribe();

  return true;
};
