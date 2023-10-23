import { AsyncPipe, JsonPipe, NgFor, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { catchError, map, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { BookService } from "../book/data/book.service";

@Component({
  selector: "app-book-detail-public",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterModule],
  template: `
    <ng-container *ngIf="book$ | async as book">
      <div class="book-card">
        <img [src]="book.ImageLink" alt="Book Cover" class="book-image" />
        <div class="book-details">
          <h1 class="book-title">{{ book.Title }}</h1>
          <p class="book-author">Author: {{ book.Author }}</p>
          <p class="book-country">Country: {{ book.Country }}</p>
          <p class="book-language">Language: {{ book.Language }}</p>
          <p class="book-pages">Pages: {{ book.Pages }}</p>
          <p class="book-year">Year: {{ book.Year }}</p>
          <p class="book-price">Price: ₹{{ book.Price }}</p>
          <a [href]="book.Link" class="book-link" target="_blank">Learn More</a>
          <a routerLink="/books" class="back-button">Back</a>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .book-card {
        background-color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        max-width: 80%;
        margin: auto;
        padding: 25px;
      }

      .book-image {
        width: 320px;
        height: auto;
      }

      .book-details {
        padding: 16px;
      }

      .book-title {
        font-size: 50px;
        font-weight: bold;
        margin: 0;
      }

      .book-author,
      .book-country,
      .book-language,
      .book-pages,
      .book-year,
      .book-price {
        font-size: 30px;
        margin: 25px 0;
      }

      .book-link {
        display: inline-block;
        background-color: #007bff;
        color: #fff;
        padding: 18px 26px;
        text-decoration: none;
        border-radius: 4px;
        font-size: 30px;
        font-weight: bold;
        margin-right: 10px;
      }

      .book-link:hover {
        background-color: #0056b3;
      }

      .back-button {
        display: inline-block;
        background-color: #333;
        color: #fff;
        padding: 18px 26px;
        font-size: 30px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        margin: 16px 0;
      }

      .back-button:hover {
        background-color: #000;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailPublicComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(Store);
  id$ = this.route.paramMap.pipe(map((a) => a.get("id")));
  bookService = inject(BookService);
  book$ = this.id$.pipe(
    switchMap((id) => {
      if (!id) return of(null);
      return this.bookService.findBookById(id);
    }),
    catchError((err) => {
      console.log({ "💩": err });
      return of(err);
    })
  );
  ngOnInit(): void {}
}
