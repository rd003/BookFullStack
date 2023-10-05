import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BookDetailUiComponent } from "./ui/book-detail-ui.component";
import { Book } from "./data/book.model";
import { ActivatedRoute } from "@angular/router";
import { EMPTY, Observable, map, switchMap, takeUntil, tap } from "rxjs";
import { BookService } from "./data/book.service";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "app-book-detail",
  standalone: true,
  imports: [BookDetailUiComponent, NgIf, AsyncPipe],
  template: `
    <h1>Book Detail</h1>
    <ng-container *ngIf="book$ | async as book">
      <app-book-detail-ui [book]="book" />
    </ng-container>
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
  bookService = inject(BookService);
  id$ = this.route.paramMap.pipe(map((a) => a.get("id")));
  book$: Observable<Book> = this.id$.pipe(
    switchMap((id) => {
      if (!id) return EMPTY;
      return this.bookService.findBookById(id);
    })
  );
}
