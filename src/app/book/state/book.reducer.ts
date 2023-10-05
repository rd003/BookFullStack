import { createReducer, on } from "@ngrx/store";
import { BookActions } from "./book.actions";
import { BookResponse } from "../data/book.model";
import { HttpErrorResponse } from "@angular/common/http";

export const bookFeatureKey = "book";

export interface BookState {
  bookResponse: BookResponse | null;
  loading: boolean;
  error: HttpErrorResponse | null;
  searchTerm: string | null;
  page: number | null;
  limit: number | null;
  sortColumn: string | null;
  sortDirection: "asc" | "desc" | null;
}

export const initialState: BookState = {
  bookResponse: null,
  loading: false,
  error: null,
  searchTerm: null,
  page: 1,
  limit: 10,
  sortColumn: null,
  sortDirection: null,
};

export const bookReducer = createReducer(
  initialState,
  on(BookActions.loadBooks, (state) => ({
    ...state,
    loading: true,
  })),
  on(BookActions.loadBooksSuccess, (state, { bookResponse }) => ({
    ...state,
    loading: false,
    bookResponse,
  })),
  on(BookActions.loadBooksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BookActions.setPage, (state, { page }) => ({
    ...state,
    page,
  })),
  on(BookActions.setLimit, (state, { limit }) => ({
    ...state,
    limit,
  })),
  on(BookActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(BookActions.setSortCoulumn, (state, { sortColumn }) => ({
    ...state,
    sortColumn,
  })),
  on(BookActions.setSortDirection, (state, { sortDirection }) => ({
    ...state,
    sortDirection,
  })),
  on(BookActions.addBook, (state, { book }) => ({
    ...state,
    loading: true,
  })),
  on(BookActions.addBookSuccess, (state, { book }) => {
    const books = state.bookResponse?.books ?? [];
    const currentCount = state.bookResponse?.totalCount ?? 0;
    const updatedBooks = [...books, book];
    const updateState: BookState = {
      ...state,
      bookResponse: { books: updatedBooks, totalCount: currentCount + 1 },
      loading: false,
    };
    return updateState;
  }),
  on(BookActions.addBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BookActions.updateBook, (state, { book }) => ({
    ...state,
    loading: true,
  })),
  on(BookActions.updateBookSuccess, (state, { book }) => {
    const books = state.bookResponse?.books ?? [];
    const updatedBooks = books.map((a) => (a.id == book.id ? book : a));
    const updateState: BookState = {
      ...state,
      bookResponse: {
        books: updatedBooks,
        totalCount: state.bookResponse?.totalCount ?? 0,
      },
      loading: false,
    };
    return updateState;
  }),
  on(BookActions.updateBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BookActions.deleteBookSuccess, (state, { id }) => ({
    ...state,
    loading: false,
  })),
  on(BookActions.deleteBookSuccess, (state, { id }) => {
    const books = state.bookResponse?.books ?? [];
    const currentCount = state.bookResponse?.totalCount ?? 0;
    const updatedBooks = books.filter((a) => a.id !== id);
    const updateState: BookState = {
      ...state,
      bookResponse: {
        books: updatedBooks,
        totalCount: currentCount - 1,
      },
      loading: false,
    };
    return updateState;
  }),
  on(BookActions.deleteBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
