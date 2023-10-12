import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { Store } from "@ngrx/store";
import authActions from "./auth/state/auth.actions";
import {
  selectLoginResponseState,
  selectLoginState,
  selectUserInfo,
} from "./auth/state/auth.selectors";
import { Subject, takeUntil, tap } from "rxjs";
import { tokenUtils } from "./utils/token.utils";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { AsyncPipe } from "@angular/common";
import { CartActions } from "./cart/state/cart.action";

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    MatSnackBarModule,
    AsyncPipe,
  ],
  selector: "app-root",
  template: `
    <div class="main">
      <app-header
        (logout)="logout()"
        [isLoggedIn]="(isLoggedIn$ | async) ?? false"
        [user]="userInfo$ | async"
      />
      <router-outlet />
      <app-footer />
    </div>
  `,
  styles: [
    `
      .main {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  store = inject(Store);
  snackBar = inject(MatSnackBar);
  destroyed$ = new Subject<boolean>();
  router = inject(Router);

  loginResponse$ = this.store.select(selectLoginResponseState);
  isLoggedIn$ = this.store.select(selectLoginState);
  userInfo$ = this.store.select(selectUserInfo);

  logout() {
    this.store.dispatch(authActions.logout());
    this.snackBar.open("Successfully logged out", "Dismis", {
      duration: 1000,
    });
    this.router.navigate(["/auth/login"]);
  }

  constructor() {
    // setting loginResponse at app init.
    this.loginResponse$
      .pipe(
        tap((loginResponse) => {
          if (!loginResponse) {
            //retrieve token
            const accessToken = tokenUtils.getToken();
            if (accessToken) {
              // set loginResponse state here on application start
              this.store.dispatch(authActions.loadAuthInfo({ accessToken }));
              // load cart here
              // this.store.dispatch(CartActions.loadCart());
            }
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
