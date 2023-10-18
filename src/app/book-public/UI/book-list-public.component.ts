import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Book } from "src/app/book/data/book.model";

@Component({
  selector: "app-book-list-public",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <mat-card class="example-card" *ngFor="let book of books">
      <img
        mat-card-image
        class="book-image"
        [src]="book.ImageLink"
        alt="Photo of a Shiba Inu"
      />
      <mat-card-content>
        <div style="font-weight: bold;margin:2px 0px">{{ book.Title }}</div>

        <div class="">
          {{ book.Author }}
        </div>

        <div class="">
          {{ book.Language }}
        </div>
        <div class="">₹{{ book.Price }}</div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="accent" (click)="addToCart.emit(book)">
          <mat-icon>shopping_cart</mat-icon>
          Add To Cart
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .example-card {
        max-width: 170px;
      }

      .book-image {
        /* background-image: url("https://material.angular.io/assets/img/examples/shiba1.jpg"); */
        background-size: cover;
      }

      :host {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        padding: 0px 97px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListPublicComponent {
  @Input() books!: Book[];
  @Output() addToCart = new EventEmitter<Book>();
}
