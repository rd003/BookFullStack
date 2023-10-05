import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from "@angular/core";
import { BookFilterComponent } from "./ui/book-filter.component";
import { BookListComponent } from "./ui/book-list.component";
import { Book } from "./data/book.model";
import { BookPaginatorComponent } from "./ui/book-paginator.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { BookDialogComponent } from "./ui/book-dialog-component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Store } from "@ngrx/store";
import { BookActions } from "./state/book.actions";
import { selectBooks, selectTotalCount } from "./state/book.selectors";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "app-book",
  standalone: true,
  imports: [
    BookFilterComponent,
    BookListComponent,
    BookPaginatorComponent,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    AsyncPipe,
    NgIf,
  ],
  template: `
    <h1>Books</h1>
    <p>
      <button
        type="button"
        (click)="onAddUpdate('Add', null)"
        mat-raised-button
        color="accent"
      >
        +
      </button>
    </p>
    <app-book-filter
      (onLanguageSelect)="onLanguageSelect($event)"
      (onSearchTermChange)="onSearchTermChange($event)"
      [languages]="['Hindi', 'English', 'Italian', 'French', 'Sanskrit']"
    />
    <ng-container *ngIf="books$ | async as books">
      <app-book-list
        [books]="books"
        (edit)="onAddUpdate('Edit', $event)"
        (delete)="onDelete($event)"
        (sort)="onSorting($event)"
      />
    </ng-container>
    <ng-container *ngIf="totalCount$ | async as totalCount">
      <app-book-paginator
        [totalRecords]="totalCount"
        (pageSelect)="onPageSelect($event)"
      />
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
export class BookComponent implements OnDestroy {
  dialog = inject(MatDialog);
  destroyed$ = new Subject<boolean>();
  store = inject(Store);

  books$ = this.store.select(selectBooks);
  totalCount$ = this.store.select(selectTotalCount);

  onAddUpdate(action: string, book: Book | null = null) {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      data: { book, title: action + " Book" },
    });

    dialogRef.componentInstance.sumbit
      .pipe(takeUntil(this.destroyed$))
      .subscribe((submittedBook) => {
        if (!submittedBook) return;
        if (submittedBook.id) {
          // update book
        } else {
          this.store.dispatch(BookActions.addBook({ book: submittedBook }));
        }
        // TODO: lines below only executed, when we have added books successfully
        dialogRef.componentInstance.bookForm.reset();
        dialogRef.componentInstance.onCanceled();
      });
  }

  onPageSelect(pageObj: { page: number; limit: number }) {
    const { page, limit } = pageObj;
    this.store.dispatch(BookActions.setPage({ page }));
    this.store.dispatch(BookActions.setLimit({ limit }));
    this.loadBooks();
  }

  onSorting(sortData: { sortColumn: string; sortDirection: "asc" | "desc" }) {
    const { sortColumn, sortDirection } = sortData;
    this.store.dispatch(BookActions.setSortCoulumn({ sortColumn }));
    this.store.dispatch(BookActions.setSortDirection({ sortDirection }));
    this.loadBooks();
  }

  onLanguageSelect(languages: string[] | null) {
    console.log(languages);
  }

  onSearchTermChange(searchTerm: string | null) {
    this.store.dispatch(BookActions.setSearchTerm({ searchTerm }));
    this.loadBooks();
  }

  onDelete(book: Book) {
    if (window.confirm(`Are you sure to delete book: ${book.Title}`)) {
      //TODO: delete book here
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  loadBooks() {
    this.store.dispatch(BookActions.loadBooks());
  }
  constructor() {
    this.loadBooks();
  }
}
