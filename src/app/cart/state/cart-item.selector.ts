import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartItemState, cartItemFeatureKey } from "./cart-item.reducer";

export const cartItemSelector =
  createFeatureSelector<CartItemState>(cartItemFeatureKey);

export const selectCartItems = createSelector(
  cartItemSelector,
  (state) => state.cartItems
);

export const selectCartItemLoading = createSelector(
  cartItemSelector,
  (state) => state.loading
);

export const selectCartItemError = createSelector(
  cartItemSelector,
  (state) => state.error
);

export const selectCartItemById = (props: { cartItemId: string }) =>
  createSelector(cartItemSelector, (state) =>
    state.cartItems.find((a) => a.id === props.cartItemId)
  );

// export const loadCartByUsername = (props: { username: string }) =>
//   createSelector(cartItemSelector, cartSelector, (cartItem, cart) => {

//   });
