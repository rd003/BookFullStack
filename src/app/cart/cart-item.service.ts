import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { CartItem, CartItemModel } from "./cart.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class CartItemService {
  private readonly url = environment.apiBaseUrl + "/cartItems";
  private readonly http = inject(HttpClient);
  add(cartItem: CartItem) {
    return this.http.post<CartItem>(this.url, cartItem);
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
