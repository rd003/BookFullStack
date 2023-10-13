import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CartItemComponent } from "./ui/cart-item.component";
import { CartSummaryComponent } from "./ui/cart-summary.component";
import { Store } from "@ngrx/store";
import {
  selectCartItemError,
  selectCartItemLoading,
  selectCartItems,
} from "./state/cart-item.selector";
import { Observable, map } from "rxjs";
import { CartItemModel } from "./cart.model";
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
          <ng-container *ngIf="cartItems$ | async as cartItems">
            <ng-container *ngIf="cartItems.length > 0; else noitems">
              <app-cart-item
                *ngFor="let cartItem of cartItems; trackBy: trackById"
                [cartItem]="cartItem"
                (selectQuantity)="onSelectQuantity($event)"
              />
              <app-cart-summary [subTotal]="0" [tax]="0" [total]="0" />
            </ng-container>

            <ng-template #noitems>
              <h3>No items in the cart. Please <a href="/books">add.</a></h3>
            </ng-template>
          </ng-container>
        </ng-template>
      </div>
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
  cartItems$: Observable<CartItemModel[]> = this.store.select(selectCartItems);

  loading$: Observable<boolean> = this.store.select(selectCartItemLoading);
  error$: Observable<HttpErrorResponse | null> =
    this.store.select(selectCartItemError);

  trackById(index: number, cartItem: CartItemModel) {
    return cartItem.id;
  }

  onSelectQuantity(quantity: number) {
    //TODO: add quantity to store
    // cartItem:CartItem
  }
}
