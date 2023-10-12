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
import { combineLatest, map, tap } from "rxjs";
import { Cart, CartItem } from "../cart/cart.model";
import { selectUserInfo } from "../auth/state/auth.selectors";
import { generateGUID } from "ngx-rlibs";
import { CartActions } from "../cart/state/cart.action";
import { CartItemActions } from "../cart/state/cart-item.action";

@Component({
  selector: "app-book-public",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    BookListPublicComponent,
    BookFilterPublicComponent,
  ],
  template: `
    <ng-container *ngIf="error$ | async; else noerror">
      Error on loading books
    </ng-container>
    <ng-template #noerror>
      <ng-container *ngIf="books$ | async as books">
        <ng-container *ngIf="books && books.length > 0; else nodata">
          <app-book-filter-public (OnBookSearch)="handleBookSearch($event)" />
          <app-book-list-public [books]="books" />
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
  store = inject(Store);
  books$ = this.store.select(selectBooks);
  loading$ = this.store.select(selectBookLoading);
  error$ = this.store.select(selectBookError);

  // user
  user$ = this.store.select(selectUserInfo);

  cart$ = this.store.select(selectCart); // 💩
  cartItems$ = this.store.select(selectCartItems);

  isCartCreated$ = this.cart$.pipe(map((a) => (a ? true : false)));
  isCartItemsEmpty$ = this.cartItems$.pipe(
    map((a) => (a.length > 0 ? false : true))
  );
  isCartExists$ = combineLatest([
    this.isCartCreated$,
    this.isCartItemsEmpty$,
  ]).pipe(
    map(([isCartCreated, isCartEmpty]) => {
      isCartCreated && !isCartEmpty;
    })
  );

  handleBookSearch(searchTerm: string) {
    this.store.dispatch(BookActions.setSearchTerm({ searchTerm }));
    this.store.dispatch(BookActions.loadBooks());
  }

  addItemToCart(item: CartItem) {
    if (this.isCartExists$) this.incrementQuantity(item);
    else this.createCartEntry(item);
  }

  // increment quantity of  cart item
  private incrementQuantity(item: CartItem) {
    const cartItem$ = this.store.select(
      selectCartItemById({ cartItemId: item.id })
    );
    cartItem$
      .pipe(
        tap((cartItem) => {
          if (cartItem) {
            cartItem.quantity = cartItem.quantity + 1;
            this.store.dispatch(CartItemActions.updateCartItem({ cartItem }));
          }
        })
      )
      .subscribe();
  }

  // create new entry in cart (cart & cartItem)
  private createCartEntry(item: CartItem) {
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
            item.id = generateGUID();
            item.cartId = myCart.id;
            this.store.dispatch(
              CartItemActions.addCartItem({ cartItem: item })
            );
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
