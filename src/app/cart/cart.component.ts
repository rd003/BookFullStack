import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NgIf, NgFor, AsyncPipe, JsonPipe } from "@angular/common";
import { CartUiComponent } from "./ui/cart-ui/cart-ui.component";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, JsonPipe, CartUiComponent],
  template: `
    <p>cart works!</p>
    <app-cart-ui />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {}
