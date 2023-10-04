import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Book, BookParams, BookResponse } from "./book.model";
import { tokenKey } from "src/app/utils/token.utils";

@Injectable({ providedIn: "root" })
export class BookService {
  private http = inject(HttpClient);
  private url = environment.apiBaseUrl;

  getBooks(bookParams: BookParams) {
    const { searchTerm, _page, _limit, sortColumn, sortDirection } = bookParams;
    let parameters = new HttpParams();
    if (searchTerm) parameters = parameters.set("q", searchTerm);
    if (_page) parameters = parameters.set("_page", _page.toString());
    if (_limit) parameters = parameters.set("_limit", _limit.toString());
    if (sortColumn) parameters = parameters.set("_sort", sortColumn);
    if (sortDirection) parameters = parameters.set("_order", sortDirection);

    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${localStorage.getItem(tokenKey)}`
    );

    return this.http
      .get(this.url + "/books", {
        headers: headers,
        observe: "response",
        params: parameters,
      })
      .pipe(
        map((response) => {
          const totalCount = Number(response.headers.get("X-Total-Count"));
          const books = response.body as Book[];
          console.log(response);
          const bookResponse: BookResponse = { books, totalCount };
          return bookResponse;
        })
      );
  }
}
