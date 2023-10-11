import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "../cart.service";
import { CartActions } from "./cart.action";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly cartService = inject(CartService);

  addCart = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addCart),
      switchMap((action) =>
        this.cartService.add(action.cart).pipe(
          map((cart) => CartActions.addCart({ cart })),
          catchError((error) => {
            console.log(error);
            return of(error);
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
          map((cart) => CartActions.removeCart({ id: action.id })),
          catchError((error) => {
            console.log(error);
            return of(error);
          })
        )
      )
    )
  );
}
