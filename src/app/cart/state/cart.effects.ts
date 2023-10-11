import { Injectable, inject } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { CartService } from "../cart.service";

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly cartService = inject(CartService);

  addCart = createEffect(() => this.actions$.pipe());
}
