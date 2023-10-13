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

export const selectSubTotal = createSelector(selectCartItems, (state) =>
  state.reduce((a, c) => a + c.book.Price, 0)
);

export const selectTax = createSelector(
  selectSubTotal,
  (state) => state * 0.08
);

export const selectCartTotal = createSelector(
  selectSubTotal,
  selectTax,
  (subTotal, tax) => subTotal + tax
);
