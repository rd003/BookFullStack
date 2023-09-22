import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      book-filter works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFilterComponent {

}
