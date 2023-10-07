import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-book-detail-public",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  template: ``,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailPublicComponent implements OnInit {
  ngOnInit(): void {}
}
