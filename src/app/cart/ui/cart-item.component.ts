import { NgFor } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { tap } from "rxjs";
import { CartItem, CartItemModel } from "../cart.model";

@Component({
  selector: "app-cart-item",
  standalone: true,
  imports: [
    NgFor,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <div class="item">
      <img [src]="cartItem.book.ImageLink" />
    </div>
    <div class="item">{{ cartItem.book.Title }}</div>
    <div class="item">{{ cartItem.book.Author }}</div>
    <div class="item">{{ cartItem.book.Price }}</div>
    <div class="item">
      <mat-form-field [subscriptSizing]="'dynamic'">
        <mat-label>Qty</mat-label>
        <mat-select [formControl]="quantity">
          <mat-option
            *ngFor="let qty of [1, 2, 3, 4, 5]; trackBy: trackByFn"
            [value]="qty"
            >{{ qty }}</mat-option
          >
        </mat-select>
      </mat-form-field>
    </div>
    <div class="item">
      <button mat-icon-button (click)="deleteItem.emit(cartItem.id)">
        <mat-icon color="accent">delete</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px 10px;
        font-size: 18px;
        background-color: rgb(249, 249, 249);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a shadow */
        border: 1px solid rgb(78, 78, 78);
        border-radius: 10px;
        margin-bottom: 5px;
      }

      img {
        max-width: 80px;
        max-height: 80px;
        height: auto;
        width: auto;
        object-fit: contain;
      }

      mat-form-field {
        width: 100px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Input({ required: true }) cartItem!: CartItemModel;
  @Output() deleteItem = new EventEmitter<string>();
  @Output() selectQuantity = new EventEmitter<{
    cartItem: CartItemModel;
    newQuantity: number;
  }>();
  quantity = new FormControl<number>(1);

  trackByFn(index: number, qty: number) {
    return qty;
  }

  constructor() {
    this.quantity.valueChanges
      .pipe(
        tap((qty) => {
          if (qty)
            this.selectQuantity.emit({
              cartItem: this.cartItem,
              newQuantity: qty,
            });
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
