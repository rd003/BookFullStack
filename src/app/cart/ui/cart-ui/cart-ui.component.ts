import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-ui',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      cart-ui works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartUiComponent {

}
