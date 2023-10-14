import { Injectable, inject } from "@angular/core";
import { CartItemService } from "../cart-item.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartItemActions } from "./cart-item.action";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class CartItemEffects {
  private readonly cartItemService = inject(CartItemService);
  private readonly actions$ = inject(Actions);

  addCartItem = createEffect(() =>
    this.actions$.pipe(
      ofType(CartItemActions.addCartItem),
      switchMap((action) =>
        this.cartItemService.add(action.cartItem).pipe(
          map((cartItem) => CartItemActions.addCartItemSuccess({ cartItem })),
          catchError((error) => {
            console.log(error);
            return of(error);
          })
        )
      )
    )
  );

  removeCartItem = createEffect(() =>
    this.actions$.pipe(
      ofType(CartItemActions.removeCartItem),
      switchMap((action) =>
        this.cartItemService.delete(action.id).pipe(
          map(() => CartItemActions.removeCartItemSuccess({ id: action.id })),
          catchError((error) =>
            of(CartItemActions.removeCartItemFailure({ error }))
          )
        )
      )
    )
  );

  updateCartItem = createEffect(() =>
    this.actions$.pipe(
      ofType(CartItemActions.updateCartItem),
      switchMap((action) =>
        this.cartItemService.update(action.cartItem).pipe(
          map((cartItem) => {
            return CartItemActions.updateCartItemSuccess({
              cartItem,
            });
          }),
          catchError((error) =>
            of(CartItemActions.removeCartItemFailure({ error }))
          )
        )
      )
    )
  );

  getCartItems = createEffect(() =>
    this.actions$.pipe(
      ofType(CartItemActions.loadCartItems),
      switchMap((action) =>
        this.cartItemService.getCartItemsWithBook(action.cartId).pipe(
          map((cartItems) =>
            CartItemActions.loadCartItemSuccess({ cartItems })
          ),
          catchError((error) =>
            of(CartItemActions.loadCartItemFailure({ error }))
          )
        )
      )
    )
  );
}
