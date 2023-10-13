import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { CartItem, CartItemModel } from "./cart.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap } from "rxjs";
import { BookService } from "../book/data/book.service";

@Injectable({ providedIn: "root" })
export class CartItemService {
  private readonly url = environment.apiBaseUrl + "/cartItems";
  private readonly http = inject(HttpClient);
  private readonly bookService = inject(BookService);
  add(cartItem: CartItem) {
    const createdItem$ = this.http.post<CartItem>(this.url, cartItem);

    const itemWithBooks$: Observable<CartItemModel> = createdItem$.pipe(
      switchMap((createdItem) =>
        this.bookService.findBookById(createdItem.id).pipe(
          map((book) => {
            const createdItemWithBook: CartItemModel = {
              id: createdItem.id,
              book: book,
              quantity: createdItem.quantity,
              cartId: createdItem.cartId,
            };
            return createdItemWithBook;
          })
        )
      )
    );
  }

  update(cartItem: CartItem) {
    return this.http.put(`${this.url}/${cartItem.id}`, cartItem);
  }

  getById(id: string) {
    return this.http.get<CartItem[]>(`${this.url}/${id}`);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  getAll(cartId: string) {
    return this.http.get<CartItem[]>(`this.url?cartId=${cartId}`);
  }

  getCartItemsWithBook(cartId: string) {
    return this.http.get<CartItemModel[]>(
      `${this.url}?_expand=book&cartId=${cartId}`
    );
  }
}
