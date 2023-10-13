import { HttpErrorResponse } from "@angular/common/http";
import { CartItemModel } from "../cart.model";
import { createReducer, on } from "@ngrx/store";
import { CartItemActions } from "./cart-item.action";

export const cartItemFeatureKey = "CartItems";

export interface CartItemState {
  cartItems: CartItemModel[];
  loading: boolean;
  error: HttpErrorResponse | null;
}

const cartItemState: CartItemState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartItemReducer = createReducer(
  cartItemState,
  on(CartItemActions.addCartItem, (state, { cartItem }) => ({
    ...state,
    loading: true,
  })),
  on(CartItemActions.addCartItemSuccess, (state, { cartItem }) => ({
    ...state,
    loading: false,
    cartItems: [...state.cartItems, cartItem],
  })),
  on(CartItemActions.addCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CartItemActions.updateCartItem, (state, { cartItem }) => ({
    ...state,
    loading: true,
  })),
  on(CartItemActions.updateCartItemSuccess, (state, { cartItem }) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.map((a) =>
      a.cartId === cartItem.id ? cartItem : a
    ),
  })),
  on(CartItemActions.updateCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CartItemActions.removeCartItem, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(CartItemActions.removeCartItemSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.filter((a) => a.cartId !== a.id),
  })),
  on(CartItemActions.removeCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CartItemActions.loadCartItems, (state, { cartId }) => ({
    ...state,
    loading: true,
  })),
  on(CartItemActions.loadCartItemSuccess, (state, { cartItems }) => ({
    ...state,
    loading: false,
    cartItems,
  })),
  on(CartItemActions.loadCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CartItemActions.emptyCartItemState, (state) => ({
    ...state,
    cartItems: [],
  }))
);
