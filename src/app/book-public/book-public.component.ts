import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
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
  selectCartItemById,
  selectCartItems,
} from "../cart/state/cart-item.selector";
import { Observable, combineLatest, map, tap } from "rxjs";
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
            (addToCart)="addItemToCart($event)"
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
export class BookPublicComponent implements OnInit {
  snackBar = inject(MatSnackBar);
  store = inject(Store);
  books$ = this.store.select(selectBooks);
  loading$ = this.store.select(selectBookLoading);
  error$ = this.store.select(selectBookError);

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

  isCartCreated$ = this.cart$.pipe(map((a) => (a ? true : false)));
  isCartItemsEmpty$ = this.cartItems$.pipe(
    map((a) => (a.length > 0 ? false : true))
  );
  isCartExists$ = combineLatest([
    this.isCartCreated$,
    this.isCartItemsEmpty$,
  ]).pipe(
    map(([isCartCreated, isCartEmpty]) => {
      return isCartCreated && !isCartEmpty;
    })
  );

  handleBookSearch(searchTerm: string) {
    this.store.dispatch(BookActions.setSearchTerm({ searchTerm }));
    this.store.dispatch(BookActions.loadBooks());
  }

  addItemToCart(book: Book) {
    combineLatest([this.isLoggedIn$, this.isCartExists$])
      .pipe(
        tap(([isLoggedIn, isCartExist]) => {
          // getting infinite loop here
          // use something like distinct
          if (!isLoggedIn) alert("Please login first");
          else {
            alert(isCartExist);
          }
        })
      )
      .subscribe();
    // try {
    //   if (this.isCartExists$) {
    //     // find cartitem by bookId
    //     this.incrementQuantity(item);
    //   } else this.createCartEntry(book.id);
    //   this.snackBar.open("Item added to cart", "dismis", {
    //     duration: 1000,
    //   });
    // } catch (error: any) {
    //   console.log(error);
    //   this.snackBar.open("Error on adding item", "dismis", {
    //     duration: 1000,
    //   });
    // }
  }

  // increment quantity of  cart item
  private incrementQuantity(item: CartItem) {
    const cartItem$ = this.store.select(
      selectCartItemById({ cartItemId: item.id })
    );
    cartItem$
      .pipe(
        tap((cartItemModel) => {
          if (cartItemModel) {
            const cartItem: CartItem = {
              id: cartItemModel.id,
              cartId: cartItemModel.cartId,
              bookId: cartItemModel.book.id,
              quantity: cartItemModel.quantity + 1,
            };
            this.store.dispatch(CartItemActions.updateCartItem({ cartItem }));
          }
        })
      )
      .subscribe();
  }

  // create new entry in cart (cart & cartItem)
  private createCartEntry(bookId: string) {
    // check user, if user is logged in then create cart
    this.user$
      .pipe(
        tap((user) => {
          if (user) {
            const cart: Cart = {
              username: user.username,
              id: generateGUID(),
            };
            this.store.dispatch(CartActions.addCart({ cart }));
          }
        })
      )
      .subscribe();

    // check if cart is available, because we need cartId to generate cartItem
    // if cart is not null then, generate cartItem
    this.cart$
      .pipe(
        tap((myCart) => {
          // create new entry in cart
          if (myCart) {
            const cartItem: CartItem = {
              id: generateGUID(),
              bookId: bookId,
              cartId: myCart.id,
              quantity: 1,
            };
            this.store.dispatch(CartItemActions.addCartItem({ cartItem }));
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(BookActions.setPage({ page: null }));
    this.store.dispatch(BookActions.setLimit({ limit: null }));
    this.store.dispatch(BookActions.loadBooks());
  }
}
