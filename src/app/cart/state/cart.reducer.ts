import { HttpErrorResponse } from "@angular/common/http";
import { Cart } from "../cart.model";
import { createReducer, on } from "@ngrx/store";
import { CartActions } from "./cart.action";

export const CartKey = "Cart";
export interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const cartState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const CartReducer = createReducer(
  cartState,
  on(CartActions.addCart, (state, { cart }) => ({ ...state, loading: true })),
  on(CartActions.addCartSuccess, (state, { cart }) => ({
    ...state,
    loading: false,
  })),
  on(CartActions.addCartError, (state, { error }) => ({
    ...state,
    loading: false,
  })),

  on(CartActions.removeCart, (state, { id }) => ({ ...state, loading: true })),
  on(CartActions.removeSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    cart: state.cart?.id === id ? null : state.cart,
  })),
  on(CartActions.addCartError, (state, { error }) => ({
    ...state,
    loading: false,
  }))
);
