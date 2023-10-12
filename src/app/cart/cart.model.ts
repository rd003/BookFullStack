import { Book } from "../book/data/book.model";

export interface Cart {
  id: string;
  username: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  bookId: string;
  quantity: string;
}

export interface CartItemModel {
  id: string;
  cartId: string;
  book: Book;
  quantity: string;
}

export interface UserCart {
  id: string;
  username: string;
  cartItems: CartItem[];
}
