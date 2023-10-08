import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
@Component({
  selector: "app-book-filter-public",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  template: ``,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFilterPublic {}
