import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'book-crud-home',
  standalone: true,
  template: ` WELCOME `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
