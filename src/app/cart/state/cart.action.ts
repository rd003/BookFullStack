import { createActionGroup, emptyProps } from "@ngrx/store";

export const CartActions = createActionGroup({
  source: "Carts",
  events: {
    "Load Carts": emptyProps(),
  },
});
