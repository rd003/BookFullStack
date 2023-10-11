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
import { selectCartItems } from "../cart/state/cart-item.selector";
import { combineLatest, map } from "rxjs";
import { CartItem } from "../cart/cart.model";
import authActions from "../auth/state/auth.actions";
import { selectUserInfo } from "../auth/state/auth.selectors";

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

  // Note: Everything related to cart is wrong💩
  // cart should be selected according to user
  // cartItem should be selected according to cart

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
    if (this.isCartExists$) {
      // increment quantity
    } else {
      // create cart and cartItem
    }
  }

  ngOnInit(): void {
    this.store.dispatch(BookActions.setPage({ page: null }));
    this.store.dispatch(BookActions.setLimit({ limit: null }));
    this.store.dispatch(BookActions.loadBooks());
  }
}
