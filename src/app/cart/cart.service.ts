import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { Cart } from "./cart.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CartService {
  private readonly url = environment.apiBaseUrl + "/carts";
  private readonly http = inject(HttpClient);
  add(cart: Cart) {
    return this.http.post<Cart>(this.url, cart);
  }

  update(cart: Cart) {
    return this.http.put(`${this.url}/${cart.id}`, cart);
  }

  getById(id: string) {
    return this.http.get<Cart[]>(`${this.url}/${id}`);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  getAll(cart: Cart) {
    return this.http.get<Cart[]>(this.url);
  }
}
