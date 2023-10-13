import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
} from "@angular/core";
import { LoginFormComponent } from "./ui/login-form.component";
import { LoginModel } from "./data/login.model";
import { Store } from "@ngrx/store";
import authActions from "./state/auth.actions";
import {
  selectLoginErrorState,
  selectLoginLoadingState,
  selectLoginState,
  selectUserInfo,
} from "./state/auth.selectors";
import { AsyncPipe, NgIf } from "@angular/common";
import {
  EMPTY,
  Observable,
  Subject,
  combineLatest,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
} from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { selectCart } from "../cart/state/cart.selector";
import { Cart } from "../cart/cart.model";
import { tokenUtils } from "../utils/token.utils";
import { CartActions } from "../cart/state/cart.action";
import { CartItemActions } from "../cart/state/cart-item.action";

@Component({
  selector: "angular-monorepo-login",
  standalone: true,
  imports: [
    LoginFormComponent,
    NgIf,
    AsyncPipe,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <ng-container *ngIf="loading$ | async as loading">
      <mat-spinner *ngIf="loading"></mat-spinner>
    </ng-container>

    <!-- <ng-container *ngIf="error$ | async as error">
      {{ error }}
    </ng-container> -->
    <auth-login-form (submit)="onSubmit($event)" />
  `,
  styles: [
    `
      :host {
        padding: 20px 10px;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  store = inject(Store);
  router = inject(Router);
  snackbar = inject(MatSnackBar);
  destroyed$ = new Subject<boolean>();
  @ViewChild(LoginFormComponent, { static: true })
  loginFormComponent!: LoginFormComponent;
  loading$ = this.store.select(selectLoginLoadingState);
  userInfo$ = this.store.select(selectUserInfo);

  cart$: Observable<Cart | null> = this.store.select(selectCart);

  error$ = this.store
    .select(selectLoginErrorState)
    .pipe(
      tap((d) => {
        if (d?.message) {
          this.loginFormComponent.resetLoginForm();
          this.snackbar.open(d?.message, "dismis", {
            duration: 1000,
          });
        }
      }),
      takeUntil(this.destroyed$)
    )
    .subscribe();

  doLogin$ = combineLatest([this.userInfo$, this.cart$]).pipe(
    switchMap(([userInfo, cart]) => {
      if (userInfo) {
        const { username } = userInfo;
        if (username) this.store.dispatch(CartActions.loadCart({ username }));
      }
      if (cart) {
        this.store.dispatch(CartItemActions.loadCartItems({ cartId: cart.id }));
      }
      return userInfo === null ? of(false) : of(true);
    }),
    tap((loggedIn) => {
      if (loggedIn) {
        this.snackbar.open("Suceessfully logged in", "dismis", {
          duration: 1000,
        });

        this.router.navigate(["/dashboard"]);
      }
    }),
    takeUntil(this.destroyed$)
  );

  // isLoggedIn$ = this.store.select(selectLoginState).pipe(
  //   tap((loggedIn) => {
  //     if (loggedIn) {
  //       this.snackbar.open("Suceessfully logged in", "dismis", {
  //         duration: 1000,
  //       });

  //       this.router.navigate(["/dashboard"]);
  //     }
  //   }),
  //   takeUntil(this.destroyed$)
  // );

  onSubmit(loginData: LoginModel) {
    this.store.dispatch(authActions.login({ login: loginData }));
    this.doLogin$.subscribe();
    //this.isLoggedIn$.subscribe();

    //TODO: Reset form if authentication failed.
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
