import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Book, BookResponse } from "../data/book.model";
import { HttpErrorResponse } from "@angular/common/http";

export const BookActions = createActionGroup({
  source: "Book",
  events: {
    "Load Books": emptyProps(),
    "Load Books Success": props<{ bookResponse: BookResponse }>(),
    "Load Books Failure": props<{ error: HttpErrorResponse }>(),
    "Set Search Term": props<{ searchTerm: string | null }>(),
    "Set Limit": props<{ limit: number | null }>(),
    "Set Page": props<{ page: number | null }>(),
    "Set Sort Coulumn": props<{ sortColumn: string | null }>(),
    "Set Sort Direction": props<{
      sortDirection: "asc" | "desc" | null;
    }>(),
    "Add Book": props<{ book: Book }>(),
    "Add Book Success": props<{ book: Book }>(),
    "Add Book Failure": props<{ error: HttpErrorResponse }>(),
    "Update Book": props<{ book: Book }>(),
    "Update Book Success": props<{ book: Book }>(),
    "Update Book Failure": props<{ error: HttpErrorResponse }>(),
    "Delete Book": props<{ id: string }>(),
    "Delete Book Success": props<{ id: string }>(),
    "Delete Book Failure": props<{ error: HttpErrorResponse }>(),
  },
});
