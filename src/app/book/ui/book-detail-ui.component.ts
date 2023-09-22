import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail-ui',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      book-detail-ui works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailUiComponent {

}
