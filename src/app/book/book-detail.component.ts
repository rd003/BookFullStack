import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BookDetailUiComponent } from "./ui/book-detail-ui.component";
import { Book } from "./data/book.model";

@Component({
  selector: "app-book-detail",
  standalone: true,
  imports: [BookDetailUiComponent],
  template: `
    <h1>Book Detail</h1>
    <app-book-detail-ui [book]="book" />
  `,
  styles: [
    `
      :host {
        padding: 15px 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent {
  book: Book = {
    Id: "8ef9f86b-cdc4-49ab-88de-f641e8d0ab73",
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
}
