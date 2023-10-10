import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CartItemComponent } from "./cart-item.component";
import { Book } from "src/app/book/data/book.model";
import { CartSummaryComponent } from "./cart-summary.component";

@Component({
  selector: "app-cart-ui",
  standalone: true,
  imports: [CartItemComponent, CartSummaryComponent],
  template: `
    <div class="cart-container">
      <div class="cart-items">
        <app-cart-item
          [book]="book"
          (selectQuantity)="onSelectQuantity($event)"
        />
      </div>
      <app-cart-summary />
    </div>
  `,
  styles: [
    `
      .card-container {
        width: 100%;
        display: flex;
        gap: 10px;
      }

      .cart-items {
        width: 65%;
      }

      .cart-item {
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartUiComponent {
  //TODO: remove after UI testing
  book: Book = {
    id: "8ef9f86b-cdc4-49ab-88de-f641e8d0ab73",
    Author: "Chinua Achebe",
    Country: "Nigeria",
    ImageLink: "assets/images/things-fall-apart.jpg",
    Language: "English",
    Link: "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
    Pages: 209,
    Title: "Things Fall Apart",
    Year: 1958,
    Price: 243,
  };

  onSelectQuantity(quantity: number) {
    //TODO: add quantity to store
  }
}
