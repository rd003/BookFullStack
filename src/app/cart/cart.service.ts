import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { Cart } from "./cart.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: "root" })
export class CartService {
  private readonly url = environment.apiBaseUrl + "/carts";
  private readonly http = inject(HttpClient);

  add(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.url, cart);
  }

  update(cart: Cart): Observable<any> {
    return this.http.put(`${this.url}/${cart.id}`, cart);
  }

  getById(id: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  // getAll(): Observable<Cart[]> {
  //   return this.http.get<Cart[]>(this.url);
  // }

  getCartByUsername(username: string): Observable<Cart> {
    return this.http
      .get<Cart[]>(`${this.url}?username=${username}`)
      .pipe(map((a) => a[0]));
  }
}
