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
  on(CartItemActions.addCartItemSuccess, (state, { cartItem }) => {
    const updateState = {
      ...state,
      loading: false,
      cartItems: [...state.cartItems, cartItem],
    };
    console.log(updateState.cartItems);
    return updateState;
  }),
  on(CartItemActions.addCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CartItemActions.updateCartItem, (state, { cartItem }) => ({
    ...state,
    loading: true,
  })),
  on(CartItemActions.updateCartItemSuccess, (state, { cartItem }) => {
    const newState = {
      ...state,
      loading: false,
      cartItems: state.cartItems.map((a) =>
        a.id === cartItem.id ? cartItem : a
      ),
    };

    return newState;
  }),
  on(CartItemActions.updateCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CartItemActions.removeCartItem, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(CartItemActions.removeCartItemSuccess, (state, { id }) => {
    const stateAfterDelete = {
      ...state,
      loading: false,
      cartItems: state.cartItems.filter((a) => a.id !== id),
    };
    return stateAfterDelete;
  }),
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
