import { Book } from "../book/data/book.model";

export interface Cart {
  id: string;
  username: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  bookId: string;
  quantity: number;
}

export interface CartItemModel {
  id: string;
  cartId: string;
  book: Book;
  quantity: number;
}

export interface UserCart {
  id: string;
  username: string;
  cartItems: CartItem[];
}
