import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CartItemComponent } from "./ui/cart-item.component";
import { Book } from "src/app/book/data/book.model";
import { CartSummaryComponent } from "./ui/cart-summary.component";

@Component({
  selector: "app-cart",
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
