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
    console.log({ cartItem });
    console.log({ before: state.cartItems });
    const updatedState = {
      ...state,
      loading: false,
      cartItems: [...state.cartItems, cartItem],
    };
    console.log({ "after:": updatedState.cartItems });
    return updatedState;
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
  on(CartItemActions.removeCartItemSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.filter((a) => a.id !== id),
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
  on(CartItemActions.loadCartItemSuccess, (state, { cartItems }) => {
    // how cartItems have 1 one item, since there is not item in cart.
    console.log({ cartItems });
    const updatedState = {
      ...state,
      loading: false,
      cartItems,
    };
    return updatedState;
  }),
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
