import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Book } from "../data/book.model";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
@Component({
  selector: "app-book-detail-ui",
  standalone: true,
  imports: [MatListModule, MatButtonModule, RouterModule],
  template: `
    <button
      type="button"
      mat-raised-button
      color="accent"
      routerLink="/manage-books"
    >
      Back
    </button>
    <mat-list>
      <mat-list-item
        ><span class="heading">Title</span> {{ book.Title }}</mat-list-item
      >
      <mat-divider></mat-divider>

      <mat-list-item
        ><span class="heading">Author</span> {{ book.Author }}</mat-list-item
      >
      <mat-divider></mat-divider>

      <mat-list-item
        ><span class="heading">Language</span>
        {{ book.Language }}</mat-list-item
      >
      <mat-divider></mat-divider>

      <mat-list-item
        ><span class="heading">Country</span> {{ book.Country }}</mat-list-item
      >
      <mat-divider></mat-divider>

      <mat-list-item
        ><span class="heading">Year</span> {{ book.Year }}</mat-list-item
      >
      <mat-divider></mat-divider>

      <mat-list-item
        ><span class="heading">Pages</span> {{ book.Pages }}</mat-list-item
      >
      <mat-divider></mat-divider>

      <mat-list-item
        ><span class="heading">Price</span> {{ book.Price }}</mat-list-item
      >
      <mat-divider></mat-divider>

      <mat-list-item
        ><span class="heading">Link</span> {{ book.Link }}</mat-list-item
      >
      <mat-divider></mat-divider>
    </mat-list>
  `,
  styles: [
    `
      .heading {
        font-weight: bold;
      }

      .heading:after {
        content: " : ";
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailUiComponent {
  @Input() book!: Book;
}
