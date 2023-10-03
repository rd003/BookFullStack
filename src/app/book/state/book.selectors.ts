import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookState, bookFeatureKey } from "./book.reducer";

export const selectBookState = createFeatureSelector<BookState>(bookFeatureKey);

export const selectBooks = createSelector(
  selectBookState,
  (state) => state.bookResponse?.books
);
export const selectTotalCount = createSelector(
  selectBookState,
  (state) => state.bookResponse?.totalCount
);

export const selectBookLoading = createSelector(
  selectBookState,
  (state) => state.loading
);

export const selectBookError = createSelector(
  selectBookState,
  (state) => state.error
);
export const selectPage = createSelector(
  selectBookState,
  (state) => state.page
);

export const selectLimit = createSelector(
  selectBookState,
  (state) => state.limit
);

export const selectSearchTerm = createSelector(
  selectBookState,
  (state) => state.searchTerm
);

export const selectSortColumn = createSelector(
  selectBookState,
  (state) => state.sortColumn
);

export const selectSortDirection = createSelector(
  selectBookState,
  (state) => state.sortDirection
);
