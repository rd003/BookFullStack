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
  }))
);
