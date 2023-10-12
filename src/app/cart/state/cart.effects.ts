import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "../cart.service";
import { CartActions } from "./cart.action";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly cartService = inject(CartService);

  loadCart = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap((action) =>
        this.cartService.getAll().pipe(
          map((cart) => CartActions.loadCartSuccess({ cart })),
          catchError((error) => {
            console.log(error);
            return of(CartActions.loadCartError({ error }));
          })
        )
      )
    )
  );

  addCart = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addCart),
      switchMap((action) =>
        this.cartService.add(action.cart).pipe(
          map((cart) => CartActions.addCartSuccess({ cart })),
          catchError((error) => {
            console.log(error);
            return of(CartActions.addCartError({ error }));
          })
        )
      )
    )
  );

  removeCart = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeCart),
      switchMap((action) =>
        this.cartService.delete(action.id).pipe(
          map((cart) => CartActions.removeCartSuccess({ id: action.id })),
          catchError((error) => {
            console.log(error);
            return of(CartActions.removeCartError({ error }));
          })
        )
      )
    )
  );
}
