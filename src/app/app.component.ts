import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
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
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
} from "rxjs";
import { tokenUtils } from "./utils/token.utils";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { AsyncPipe } from "@angular/common";
import { CartActions } from "./cart/state/cart.action";
import { CartItemActions } from "./cart/state/cart-item.action";
import { selectCartItems } from "./cart/state/cart-item.selector";
import { selectCart } from "./cart/state/cart.selector";
import { Cart } from "./cart/cart.model";

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
        [cartCount]="(cartItemCount$ | async) ?? 0"
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
export class AppComponent implements OnDestroy, OnInit {
  store = inject(Store);
  snackBar = inject(MatSnackBar);
  destroyed$ = new Subject<boolean>();
  router = inject(Router);
  cartLoaded = false;

  loginResponse$ = this.store.select(selectLoginResponseState);
  isLoggedIn$ = this.store.select(selectLoginState);
  userInfo$ = this.store.select(selectUserInfo);

  cartItemCount$: Observable<number> = this.store
    .select(selectCartItems)
    .pipe(map((a) => a.length));

  logout() {
    this.store.dispatch(authActions.logout());
    // empty cart state
    this.store.dispatch(CartActions.emptyCartState());
    // empty cart Item state
    this.store.dispatch(CartItemActions.emptyCartItemState());
    this.snackBar.open("Successfully logged out", "Dismis", {
      duration: 1000,
    });
    this.router.navigate(["/auth/login"]);
  }

  loadAuthInfo() {
    this.loginResponse$
      .pipe(
        tap((loginResponse) => {
          if (!loginResponse) {
            //retrieve token
            const accessToken = tokenUtils.getToken();
            if (accessToken) {
              // set loginResponse state here on application start
              this.store.dispatch(authActions.loadAuthInfo({ accessToken }));
              const user = tokenUtils.getUserFromToken(accessToken);
              if (user?.username)
                this.store.dispatch(
                  CartActions.loadCart({ username: user.username })
                );
            }
          }
        }),
        catchError((error) => {
          console.log(error);
          return of(error);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  loadCart() {
    const cart$: Observable<Cart | null> = this.store.select(selectCart);
    cart$
      .pipe(
        tap((cart) => {
          if (cart) {
            this.store.dispatch(
              CartItemActions.loadCartItems({ cartId: cart.id })
            );
            this.cartLoaded = true;
          }
        }),
        takeWhile(() => this.cartLoaded),
        catchError((error) => {
          console.log(error);
          return of(error);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnInit(): void {
    console.log("On init");
    this.loadAuthInfo();
    this.loadCart();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
