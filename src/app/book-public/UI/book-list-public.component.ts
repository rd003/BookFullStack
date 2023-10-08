import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

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
    <mat-card
      class="example-card"
      *ngFor="let book of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
    >
      <mat-card-header>
        <mat-card-title>Book Name</mat-card-title>
        <mat-card-subtitle> Author</mat-card-subtitle>
      </mat-card-header>
      <img
        mat-card-image
        src="https://material.angular.io/assets/img/examples/shiba2.jpg"
        alt="Photo of a Shiba Inu"
      />
      <mat-card-content>
        <p></p>
        <p>Language: Hindi</p>
        <p>Price: 200</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="accent">
          <mat-icon>shopping_cart</mat-icon>
          Add To Cart
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .example-card {
        max-width: 250px;
      }

      .example-header-image {
        background-image: url("https://material.angular.io/assets/img/examples/shiba1.jpg");
        background-size: cover;
      }

      :host {
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        padding: 10px 50px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListPublicComponent {}
