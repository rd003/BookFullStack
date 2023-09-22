import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'book-crud-not-found',
  template: `404 page not found`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NotFoundComponent {}
