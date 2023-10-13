import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Cart } from "../cart.model";
import { HttpErrorResponse } from "@angular/common/http";

export const CartActions = createActionGroup({
  source: "Carts",
  events: {
    "Load Cart": props<{ username: string }>(),
    "Load Cart Success": props<{ cart: Cart }>(),
    "Load Cart Error": props<{ error: HttpErrorResponse }>(),
    "Add Cart": props<{ cart: Cart }>(),
    "Add Cart Success": props<{ cart: Cart }>(),
    "Add Cart Error": props<{ error: HttpErrorResponse }>(),
    "Remove Cart": props<{ id: string }>(),
    "Remove Cart Success": props<{ id: string }>(),
    "Remove Cart Error": props<{ error: HttpErrorResponse }>(),
    "Empty Cart State": emptyProps(),
  },
});
