import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from "@angular/core";
import { BookDetailUiComponent } from "./ui/book-detail-ui.component";
import { Book } from "./data/book.model";
import { ActivatedRoute } from "@angular/router";

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
  route = inject(ActivatedRoute);
  // TODO: fecth id from route, and fetch book from service
  book!: Book;
}
