import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Book, BookParams, BookResponse } from "./book.model";

@Injectable({ providedIn: "root" })
export class BookService {
  private http = inject(HttpClient);
  private url = environment.apiBaseUrl + "/books";

  getBooks(bookParams: BookParams) {
    const { searchTerm, _page, _limit, sortColumn, sortDirection } = bookParams;
    let parameters = new HttpParams();
    parameters = parameters.set("bypassAuth", true);
    if (searchTerm) parameters = parameters.set("q", searchTerm);
    if (_page) parameters = parameters.set("_page", _page.toString());
    if (_limit) parameters = parameters.set("_limit", _limit.toString());
    if (sortColumn) parameters = parameters.set("_sort", sortColumn);
    if (sortDirection) parameters = parameters.set("_order", sortDirection);
    return this.http
      .get(this.url, {
        observe: "response",
        params: parameters,
      })
      .pipe(
        map((response) => {
          const totalCount = Number(response.headers.get("X-Total-Count"));
          const books = response.body as Book[];
          const bookResponse: BookResponse = { books, totalCount };
          return bookResponse;
        })
      );
  }

  addBook(book: Book) {
    console.log(JSON.stringify(book));
    return this.http.post<Book>(this.url, book);
  }

  updateBook(book: Book) {
    const url = `${this.url}/${book.id}`;
    return this.http.put<Book>(url, book);
  }

  findBookById(id: string) {
    var parameters = new HttpParams().set("id", id).set("bypassAuth", true);
    return this.http
      .get<Book[]>(this.url, {
        params: parameters,
      })
      .pipe(map((a) => a[0]));
  }

  deleteBook(id: string) {
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url);
  }
}
