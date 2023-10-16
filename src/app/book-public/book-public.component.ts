import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { BookActions } from "../book/state/book.actions";
import {
  selectBookError,
  selectBookLoading,
  selectBooks,
} from "../book/state/book.selectors";
import { BookListPublicComponent } from "./UI/book-list-public.component";
import { BookFilterPublicComponent } from "./UI/book-filter-public.component";
import { selectCart } from "../cart/state/cart.selector";
import {
  selectCartItemByBookAndCart,
  selectCartItems,
} from "../cart/state/cart-item.selector";
import {
  Observable,
  Subject,
  catchError,
  combineLatest,
  first,
  map,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
} from "rxjs";
import { Cart, CartItem, CartItemModel } from "../cart/cart.model";
import {
  selectLoginResponseState,
  selectUserInfo,
} from "../auth/state/auth.selectors";
import { generateGUID } from "ngx-rlibs";
import { CartActions } from "../cart/state/cart.action";
import { CartItemActions } from "../cart/state/cart-item.action";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Book } from "../book/data/book.model";

@Component({
  selector: "app-book-public",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    BookListPublicComponent,
    BookFilterPublicComponent,
    MatSnackBarModule,
  ],
  template: `
    <ng-container *ngIf="error$ | async; else noerror">
      Error on loading books
    </ng-container>
    <ng-template #noerror>
      <ng-container *ngIf="books$ | async as books">
        <ng-container *ngIf="books && books.length > 0; else nodata">
          <app-book-filter-public (OnBookSearch)="handleBookSearch($event)" />
          <app-book-list-public
            [books]="books"
            (addToCart)="handleAddItem($event)"
          />
        </ng-container>
        <ng-template #nodata> No books found </ng-template>
      </ng-container>
    </ng-template>
  `,
  styles: [
    `
      :host {
        padding: 15px 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPublicComponent implements OnInit, OnDestroy {
  snackBar = inject(MatSnackBar);
  store = inject(Store);
  books$ = this.store.select(selectBooks);
  loading$ = this.store.select(selectBookLoading);
  error$ = this.store.select(selectBookError);
  destroy$ = new Subject<boolean>();

  // user
  user$ = this.store.select(selectUserInfo);
  isLoggedIn$ = this.store.select(selectLoginResponseState).pipe(
    map((a) => {
      const loginStatus = a ? true : false;
      return loginStatus;
    })
  );

  cart$: Observable<Cart | null> = this.store.select(selectCart);
  cartItems$: Observable<CartItemModel[]> = this.store.select(selectCartItems);

  // isCartCreated$ = this.cart$.pipe(map((a) => (a ? true : false)));
  // isCartItemsEmpty$ = this.cartItems$.pipe(
  //   map((a) => (a.length > 0 ? false : true))
  // );
  // isCartExists$ = combineLatest([
  //   this.isCartCreated$,
  //   this.isCartItemsEmpty$,
  // ]).pipe(
  //   map(([isCartCreated, isCartEmpty]) => {
  //     return isCartCreated && !isCartEmpty;
  //   })
  //);

  handleBookSearch(searchTerm: string) {
    this.store.dispatch(BookActions.setSearchTerm({ searchTerm }));
    this.store.dispatch(BookActions.loadBooks());
  }

  handleAddItem(book: Book) {
    combineLatest([this.isLoggedIn$, this.cart$])
      .pipe(
        first(),
        tap(([isLoggedIn, cart]) => {
          // getting infinite loop here
          // use something like distinct
          if (!isLoggedIn) alert("Please login first");
          else {
            if (cart) this.handleExisitingCart(book.id, cart.id);
            else this.createCartForFirstTime(book.id);
          }
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  // increment quantity of  cart item
  private handleExisitingCart(bookId: string, cartId: string) {
    const cartItemIncremented$ = this.store
      .select(selectCartItemByBookAndCart({ bookId, cartId }))
      .pipe(
        first(),
        switchMap((cartItemModel) => {
          if (cartItemModel) {
            const cartItem: CartItem = {
              id: cartItemModel.id,
              cartId: cartItemModel.cartId,
              bookId: cartItemModel.book.id,
              quantity: cartItemModel.quantity + 1,
            };
            this.store.dispatch(CartItemActions.updateCartItem({ cartItem }));
          } else {
            // add item to cart
            const newCartItem: CartItem = {
              id: generateGUID(),
              bookId: bookId,
              cartId: cartId,
              quantity: 1,
            };
            this.store.dispatch(
              CartItemActions.addCartItem({ cartItem: newCartItem })
            );
          }
          return of(true);
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );

    cartItemIncremented$
      .pipe(
        tap((val) => {
          if (val === true) {
            this.snackBar.open("Item has added to cart.", "dismis", {
              duration: 1000,
            });
          } else {
            this.snackBar.open("Error on adding item!!!", "dismis", {
              duration: 1000,
            });
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  // create new entry in cart (cart & cartItem)
  private createCartForFirstTime(bookId: string) {
    // check user, if user is logged in then create cart
    const createCart$ = this.user$.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          const cart: Cart = {
            username: user.username,
            id: generateGUID(),
          };
          this.store.dispatch(CartActions.addCart({ cart }));
          return this.cart$.pipe(take(1));
        } else {
          return of(null);
        }
      }),
      catchError((ex) => {
        console.error(ex);
        return of(null);
      })
    );

    // check if cart is available, because we need cartId to generate cartItem
    // if cart is not null then, generate cartItem
    const isCartCreated$ = createCart$.pipe(
      switchMap((myCart) => {
        // create new entry in cart
        if (myCart) {
          console.log(myCart);
          const cartItem: CartItem = {
            id: generateGUID(),
            bookId: bookId,
            cartId: myCart.id,
            quantity: 1,
          };
          this.store.dispatch(CartItemActions.addCartItem({ cartItem }));
          return of(true);
        }
        return of(false);
      }),
      catchError((ex) => {
        console.log(ex);
        return of(false);
      })
    );

    isCartCreated$
      .pipe(
        tap((val) => {
          if (val === true) {
            this.snackBar.open("Item has added to cart.", "dismis", {
              duration: 1000,
            });
          } else {
            this.snackBar.open("Error on adding item!!!", "dismis", {
              duration: 1000,
            });
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(BookActions.setPage({ page: null }));
    this.store.dispatch(BookActions.setLimit({ limit: null }));
    this.store.dispatch(BookActions.loadBooks());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
