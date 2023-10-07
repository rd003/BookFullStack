import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { BookActions } from "../book/state/book.actions";
import {
  selectBookError,
  selectBookLoading,
  selectBooks,
} from "../book/state/book.selectors";

@Component({
  selector: "app-book-public",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  template: ` <h2>Book Works</h2> `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPublicComponent implements OnInit {
  store = inject(Store);
  books$ = this.store.select(selectBooks);
  loading$ = this.store.select(selectBookLoading);
  error$ = this.store.select(selectBookError);

  setSearchTerm(searchTerm: string) {
    this.store.dispatch(BookActions.setSearchTerm({ searchTerm }));
  }

  ngOnInit(): void {
    this.store.dispatch(BookActions.loadBooks());
  }
}
