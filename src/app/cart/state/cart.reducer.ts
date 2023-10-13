import { HttpErrorResponse } from "@angular/common/http";
import { Cart } from "../cart.model";
import { createReducer, on } from "@ngrx/store";
import { CartActions } from "./cart.action";

export const cartFeatureKey = "Cart";
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

export const cartReducer = createReducer(
  cartState,

  on(CartActions.loadCart, (state, { username }) => ({
    ...state,
    loading: true,
  })),
  on(CartActions.loadCartSuccess, (state, { cart }) => ({
    ...state,
    cart,
    loading: false,
  })),
  on(CartActions.loadCartError, (state, { error }) => ({
    ...state,
    loading: false,
  })),

  on(CartActions.addCart, (state, { cart }) => ({ ...state, loading: true })),
  on(CartActions.addCartSuccess, (state, { cart }) => ({
    ...state,
    cart,
    loading: false,
  })),
  on(CartActions.addCartError, (state, { error }) => ({
    ...state,
    loading: false,
  })),

  on(CartActions.removeCart, (state, { id }) => ({ ...state, loading: true })),
  on(CartActions.removeCartSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    cart: state.cart?.id === id ? null : state.cart,
  })),
  on(CartActions.addCartError, (state, { error }) => ({
    ...state,
    loading: false,
  })),
  on(CartActions.emptyCartState, (state) => ({
    ...state,
    cart: null,
  }))
);
