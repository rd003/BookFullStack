import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { CartItem, CartItemModel } from "./cart.model";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of, switchMap } from "rxjs";
import { BookService } from "../book/data/book.service";

@Injectable({ providedIn: "root" })
export class CartItemService {
  private readonly url = environment.apiBaseUrl + "/cartItems";
  private readonly http = inject(HttpClient);
  private readonly bookService = inject(BookService);

  add(cartItem: CartItem): Observable<CartItemModel> {
    const createdItem$ = this.http.post<CartItem>(this.url, cartItem);

    const itemWithBooks$: Observable<CartItemModel> = createdItem$.pipe(
      switchMap((createdItem) =>
        this.bookService.findBookById(createdItem.bookId).pipe(
          map((book) => {
            const createdItemWithBook: CartItemModel = {
              id: createdItem.id,
              book: book,
              quantity: createdItem.quantity,
              cartId: createdItem.cartId,
            };
            return createdItemWithBook;
          }),
          catchError((err) => {
            console.error(err);
            return of(err);
          })
        )
      )
    );

    return itemWithBooks$;
  }

  update(cartItem: CartItem): Observable<CartItemModel> {
    const updated$ = this.http.put(`${this.url}/${cartItem.id}`, cartItem);

    const cartItemModel$: Observable<CartItemModel> = updated$.pipe(
      switchMap(() =>
        this.bookService.findBookById(cartItem.bookId).pipe(
          map((book) => {
            const createdItemWithBook: CartItemModel = {
              id: cartItem.id,
              book: book,
              quantity: cartItem.quantity,
              cartId: cartItem.cartId,
            };
            return createdItemWithBook;
          })
        )
      )
    );
    return cartItemModel$;
  }

  getById(id: string): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  getAll(cartId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`this.url?cartId=${cartId}`);
  }

  getCartItemsWithBook(cartId: string): Observable<CartItemModel[]> {
    return this.http.get<CartItemModel[]>(
      `${this.url}?_expand=book&cartId=${cartId}`
    );
  }
}
