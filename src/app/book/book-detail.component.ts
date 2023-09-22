import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BookDetailUiComponent } from "./ui/book-detail-ui.component";

@Component({
  selector: "app-book-detail",
  standalone: true,
  imports: [BookDetailUiComponent],
  template: `
    <h1>Book Detail</h1>
    <app-book-detail-ui />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent {}
