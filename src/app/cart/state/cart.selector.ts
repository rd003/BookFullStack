import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState, cartFeatureKey } from "./cart.reducer";

export const cartSelector = createFeatureSelector<CartState>(cartFeatureKey);

export const selectCart = createSelector(cartSelector, (state) => state.cart);

export const selectCartLoading = createSelector(
  cartSelector,
  (state) => state.loading
);

export const selectCartError = createSelector(
  cartSelector,
  (state) => state.error
);
