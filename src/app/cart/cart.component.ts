import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CartItemComponent } from "./ui/cart-item.component";
import { CartSummaryComponent } from "./ui/cart-summary.component";
import { Store } from "@ngrx/store";
import {
  selectCartItemError,
  selectCartItemLoading,
  selectCartItems,
  selectCartTotal,
  selectSubTotal,
  selectTax,
} from "./state/cart-item.selector";
import { Observable, map } from "rxjs";
import { CartItem, CartItemModel } from "./cart.model";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { CartItemActions } from "./state/cart-item.action";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CartItemComponent, CartSummaryComponent, NgIf, NgFor, AsyncPipe],
  template: `
    <div class="cart-container">
      <ng-container *ngIf="loading$ | async"> loading... </ng-container>
      <!-- if not error then #no-orror -->
      <ng-container *ngIf="error$ | async; else noerror">
        Error occured
      </ng-container>
      <ng-template #noerror>
        <ng-container *ngIf="cartItems$ | async as cartItems">
          <ng-container *ngIf="cartItems.length > 0; else noitems">
            <div class="cart-items">
              <app-cart-item
                *ngFor="let cartItem of cartItems; trackBy: trackById"
                [cartItem]="cartItem"
                (selectQuantity)="onSelectQuantity($event)"
                (deleteItem)="onDeleteItem($event)"
              />
            </div>
            <app-cart-summary
              [subTotal]="(subTotal$ | async) ?? 0"
              [tax]="(tax$ | async) ?? 0"
              [total]="(total$ | async) ?? 0"
            />
          </ng-container>

          <ng-template #noitems>
            <h3>No items in the cart🥱. Please <a href="/books">add 🛒.</a></h3>
          </ng-template>
        </ng-container>
      </ng-template>
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
  subTotal$: Observable<number> = this.store.select(selectSubTotal);
  tax$: Observable<number> = this.store.select(selectTax);
  total$: Observable<number> = this.store.select(selectCartTotal);
  loading$: Observable<boolean> = this.store.select(selectCartItemLoading);
  error$: Observable<HttpErrorResponse | null> =
    this.store.select(selectCartItemError);

  trackById(index: number, cartItem: CartItemModel) {
    return cartItem.id;
  }

  onSelectQuantity(data: { cartItem: CartItemModel; newQuantity: number }) {
    //TODO: add quantity to store
    const { cartItem, newQuantity } = data;
    const updatedCartItem: CartItem = {
      id: cartItem.id,
      bookId: cartItem.book.id,
      cartId: cartItem.cartId,
      quantity: newQuantity,
    };
    this.store.dispatch(
      CartItemActions.updateCartItem({ cartItem: updatedCartItem })
    );
  }

  onDeleteItem(id: string) {
    if (window.confirm("Are you sure to delete?")) {
      this.store.dispatch(CartItemActions.removeCartItem({ id }));
    }
  }
}
