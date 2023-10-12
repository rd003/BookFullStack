import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CartItemComponent } from "./ui/cart-item.component";
import { CartSummaryComponent } from "./ui/cart-summary.component";
import { Store } from "@ngrx/store";
import {
  selectCartItemError,
  selectCartItemLoading,
  selectCartItems,
} from "./state/cart-item.selector";
import { Observable } from "rxjs";
import { CartItem } from "./cart.model";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CartItemComponent, CartSummaryComponent, NgIf, NgFor, AsyncPipe],
  template: `
    <div class="cart-container">
      <div class="cart-items">
        <ng-container *ngIf="loading$ | async"> loading... </ng-container>
        <!-- if not error then #no-orror -->
        <ng-container *ngIf="error$ | async; else noerror">
          Error occured
        </ng-container>
        <ng-template #noerror>
          <app-cart-item
            [book]="book"
            (selectQuantity)="onSelectQuantity($event)"
          />
        </ng-template>
      </div>
      <app-cart-summary />
    </div>
  `,
  styles: [
    `
      .cart-container {
        display: flex;
        gap: 20px;
        padding: 15px;
      }

      .cart-items {
        width: 62%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  store = inject(Store);
  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  loading$: Observable<boolean> = this.store.select(selectCartItemLoading);
  error$: Observable<HttpErrorResponse | null> =
    this.store.select(selectCartItemError);

  //TODO: remove after UI testing
  // book: Book = {
  //   id: "8ef9f86b-cdc4-49ab-88de-f641e8d0ab73",
  //   Author: "Chinua Achebe",
  //   Country: "Nigeria",
  //   ImageLink: "assets/images/things-fall-apart.jpg",
  //   Language: "English",
  //   Link: "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
  //   Pages: 209,
  //   Title: "Things Fall Apart",
  //   Year: 1958,
  //   Price: 243,
  // };

  onSelectQuantity(quantity: number) {
    //TODO: add quantity to store
  }
}
