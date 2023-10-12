import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CartItem } from "../cart.model";
import { HttpErrorResponse } from "@angular/common/http";

export const CartItemActions = createActionGroup({
  source: "CartItem",
  events: {
    "Load Cart Items": props<{ cartId: string }>(),
    "Load Cart Item Success": props<{ cartItems: CartItem[] }>(),
    "Load Cart Item Failure": props<{ error: HttpErrorResponse }>(),
    "Add Cart Item": props<{ cartItem: CartItem }>(),
    "Add Cart Item Success": props<{ cartItem: CartItem }>(),
    "Add Cart Item Failure": props<{ error: HttpErrorResponse }>(),
    "Update Cart Item": props<{ cartItem: CartItem }>(),
    "Update Cart Item Success": props<{ cartItem: CartItem }>(),
    "Update Cart Item Failure": props<{ error: HttpErrorResponse }>(),
    "Remove Cart Item": props<{ id: string }>(),
    "Remove Cart Item Success": props<{ id: string }>(),
    "Remove Cart Item Failure": props<{ error: HttpErrorResponse }>(),
  },
});
