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

export const selectSubTotal = createSelector(selectCartItems, (state) => {
  const subTotal = state.reduce((a, c) => a + c.book.Price * c.quantity, 0);
  return Number(subTotal.toFixed(2));
});

export const selectTax = createSelector(selectSubTotal, (state) => {
  const taxes = state * 0.08;
  return Number(taxes.toFixed(2));
});

export const selectCartTotal = createSelector(
  selectSubTotal,
  selectTax,
  (subTotal, tax) => Number((subTotal + tax).toFixed(2))
);

export const selectCartItemByBookId = (props: { bookId: string }) =>
  createSelector(selectCartItems, (cartItems) => {
    const item = cartItems.find((a) => a.book.id === props.bookId);
    return item;
  });
