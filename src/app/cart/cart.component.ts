import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NgIf, NgFor, AsyncPipe, JsonPipe } from "@angular/common";
import { CartUiComponent } from "./ui/cart-ui.component";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, JsonPipe, CartUiComponent],
  template: ` <app-cart-ui /> `,
  styles: [
    `
      :host {
        padding: 15px 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {}
