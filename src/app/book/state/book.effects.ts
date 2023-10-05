import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "../data/book.service";
import { BookActions } from "./book.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { selectBookState } from "./book.selectors";

@Injectable()
export class BookEffects {
  loadBooks = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadBooks),
      concatLatestFrom(() => [this.store.select(selectBookState)]),
      switchMap(([action, state]) => {
        return this.bookService
          .getBooks({
            searchTerm: state.searchTerm,
            _page: state.page,
            _limit: state.limit,
            sortColumn: state.sortColumn,
            sortDirection: state.sortDirection,
          })
          .pipe(
            map((bookResponse) =>
              BookActions.loadBooksSuccess({ bookResponse })
            ),
            catchError((error) => of(BookActions.loadBooksFailure({ error })))
          );
      })
    )
  );

  addBook = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.addBook),
      switchMap((action) => {
        return this.bookService.addBook(action.book).pipe(
          map((response) => BookActions.addBookSuccess({ book: response })),
          catchError((error) => of(BookActions.addBookFailure({ error })))
        );
      })
    )
  );

  updateBook = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.updateBook),
      switchMap((action) => {
        return this.bookService.updateBook(action.book).pipe(
          map((response) => BookActions.updateBookSuccess({ book: response })),
          catchError((error) => of(BookActions.updateBookFailure({ error })))
        );
      })
    )
  );

  deleteBook = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.deleteBook),
      switchMap((action) => {
        return this.bookService.deleteBook(action.id).pipe(
          map((response) => BookActions.deleteBookSuccess({ id: action.id })),
          catchError((error) => of(BookActions.deleteBookFailure({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private store: Store
  ) {}
}
