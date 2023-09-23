import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-book-paginator",
  standalone: true,
  imports: [MatPaginatorModule],
  template: `
    <mat-paginator
      class="book-paginator"
      [length]="totalRecords"
      [pageSize]="10"
      [pageSizeOptions]="[5, 10, 25, 100]"
      aria-label="Select page"
      (page)="onPageSelect($event)"
    >
    </mat-paginator>
  `,
  styles: [
    `
      mat-paginator {
        margin-top: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPaginatorComponent {
  @Output() pageSelect = new EventEmitter<{ page: number; limit: number }>();
  @Input({ required: true }) totalRecords!: number;

  onPageSelect(e: PageEvent) {
    const page = e.pageIndex + 1;
    const limit = e.pageSize;
    this.pageSelect.emit({ page, limit });
  }
}
